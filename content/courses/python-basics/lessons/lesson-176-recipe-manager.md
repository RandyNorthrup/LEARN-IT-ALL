---
id: "175-recipe-manager"
title: "Recipe Manager with Meal Planning"
chapterId: ch13-practice
order: 12
duration: 30
objectives:
  - Build recipe management system
  - Create meal planning features
  - Generate shopping lists
  - Track nutrition information
---

# Recipe Manager with Meal Planning

Build a comprehensive recipe management system with meal planning and shopping list generation.

## Project Overview

Create recipe manager that:
- Stores recipes with ingredients
- Plans weekly meals
- Generates shopping lists
- Tracks nutrition
- Imports/exports recipes

## Data Models

```python
# models.py
from dataclasses import dataclass, field
from datetime import date, timedelta
from typing import List, Dict, Optional, Set
from enum import Enum
import uuid

class MealType(Enum):
    """Type of meal"""
    BREAKFAST = "breakfast"
    LUNCH = "lunch"
    DINNER = "dinner"
    SNACK = "snack"

class DietaryTag(Enum):
    """Dietary restrictions and preferences"""
    VEGETARIAN = "vegetarian"
    VEGAN = "vegan"
    GLUTEN_FREE = "gluten_free"
    DAIRY_FREE = "dairy_free"
    NUT_FREE = "nut_free"
    LOW_CARB = "low_carb"
    KETO = "keto"
    PALEO = "paleo"

class MeasurementUnit(Enum):
    """Common measurement units"""
    CUP = "cup"
    TABLESPOON = "tablespoon"
    TEASPOON = "teaspoon"
    GRAM = "gram"
    KILOGRAM = "kilogram"
    OUNCE = "ounce"
    POUND = "pound"
    MILLILITER = "milliliter"
    LITER = "liter"
    PIECE = "piece"
    PINCH = "pinch"

@dataclass
class Ingredient:
    """Recipe ingredient"""
    name: str
    quantity: float
    unit: MeasurementUnit
    notes: str = ""
    
    def __str__(self):
        return f"{self.quantity} {self.unit.value} {self.name}"
    
    def scale(self, factor: float) -> 'Ingredient':
        """Scale ingredient by factor"""
        return Ingredient(
            name=self.name,
            quantity=self.quantity * factor,
            unit=self.unit,
            notes=self.notes
        )

@dataclass
class NutritionInfo:
    """Nutritional information per serving"""
    calories: int
    protein_g: float
    carbs_g: float
    fat_g: float
    fiber_g: float = 0
    sugar_g: float = 0
    sodium_mg: float = 0
    
    def scale(self, factor: float) -> 'NutritionInfo':
        """Scale nutrition by factor"""
        return NutritionInfo(
            calories=int(self.calories * factor),
            protein_g=round(self.protein_g * factor, 1),
            carbs_g=round(self.carbs_g * factor, 1),
            fat_g=round(self.fat_g * factor, 1),
            fiber_g=round(self.fiber_g * factor, 1),
            sugar_g=round(self.sugar_g * factor, 1),
            sodium_mg=round(self.sodium_mg * factor, 1)
        )

@dataclass
class Recipe:
    """Complete recipe"""
    id: str
    name: str
    description: str
    ingredients: List[Ingredient]
    instructions: List[str]
    servings: int
    prep_time_minutes: int
    cook_time_minutes: int
    meal_types: List[MealType]
    dietary_tags: List[DietaryTag]
    cuisine: str = ""
    nutrition: Optional[NutritionInfo] = None
    rating: float = 0.0
    
    def __post_init__(self):
        if not self.id:
            self.id = str(uuid.uuid4())
    
    def total_time(self) -> int:
        """Total time in minutes"""
        return self.prep_time_minutes + self.cook_time_minutes
    
    def scale_recipe(self, new_servings: int) -> 'Recipe':
        """Scale recipe to new serving size"""
        factor = new_servings / self.servings
        
        scaled_ingredients = [ing.scale(factor) for ing in self.ingredients]
        scaled_nutrition = self.nutrition.scale(factor) if self.nutrition else None
        
        return Recipe(
            id=self.id,
            name=self.name,
            description=self.description,
            ingredients=scaled_ingredients,
            instructions=self.instructions,
            servings=new_servings,
            prep_time_minutes=self.prep_time_minutes,
            cook_time_minutes=self.cook_time_minutes,
            meal_types=self.meal_types,
            dietary_tags=self.dietary_tags,
            cuisine=self.cuisine,
            nutrition=scaled_nutrition,
            rating=self.rating
        )
    
    def has_dietary_tag(self, tag: DietaryTag) -> bool:
        """Check if recipe has dietary tag"""
        return tag in self.dietary_tags
    
    def matches_meal_type(self, meal_type: MealType) -> bool:
        """Check if recipe is for meal type"""
        return meal_type in self.meal_types

@dataclass
class MealPlan:
    """Meal plan entry"""
    id: str
    date: date
    meal_type: MealType
    recipe_id: str
    servings: int
    notes: str = ""
    
    def __post_init__(self):
        if not self.id:
            self.id = str(uuid.uuid4())

@dataclass
class ShoppingListItem:
    """Shopping list item"""
    ingredient_name: str
    quantity: float
    unit: MeasurementUnit
    recipes: List[str] = field(default_factory=list)
    purchased: bool = False
    
    def __str__(self):
        recipes_str = f" (for: {', '.join(self.recipes)})" if self.recipes else ""
        status = "✓" if self.purchased else "☐"
        return f"{status} {self.quantity} {self.unit.value} {self.ingredient_name}{recipes_str}"
```

## Recipe Manager

```python
# recipe_manager.py
import json
from pathlib import Path
from typing import List, Dict, Optional

class RecipeManager:
    """Manage recipe collection"""
    
    def __init__(self, data_dir: str = "recipe_data"):
        self.data_dir = Path(data_dir)
        self.data_dir.mkdir(exist_ok=True)
        
        self.recipes: Dict[str, Recipe] = {}
        self.load_recipes()
    
    def add_recipe(self, recipe: Recipe) -> Recipe:
        """Add recipe to collection"""
        # Check for duplicate name
        for r in self.recipes.values():
            if r.name.lower() == recipe.name.lower():
                raise ValueError(f"Recipe '{recipe.name}' already exists")
        
        self.recipes[recipe.id] = recipe
        self.save_recipes()
        return recipe
    
    def update_recipe(self, recipe: Recipe):
        """Update existing recipe"""
        if recipe.id not in self.recipes:
            raise ValueError(f"Recipe {recipe.id} not found")
        
        self.recipes[recipe.id] = recipe
        self.save_recipes()
    
    def delete_recipe(self, recipe_id: str) -> bool:
        """Delete recipe"""
        if recipe_id in self.recipes:
            del self.recipes[recipe_id]
            self.save_recipes()
            return True
        return False
    
    def get_recipe(self, recipe_id: str) -> Optional[Recipe]:
        """Get recipe by ID"""
        return self.recipes.get(recipe_id)
    
    def search_recipes(self, query: str, filters: Dict = None) -> List[Recipe]:
        """Search recipes with filters"""
        query_lower = query.lower()
        results = []
        
        for recipe in self.recipes.values():
            # Text search
            if query and query_lower not in recipe.name.lower() and \
               query_lower not in recipe.description.lower():
                continue
            
            # Apply filters
            if filters:
                # Meal type filter
                if "meal_type" in filters:
                    if not recipe.matches_meal_type(filters["meal_type"]):
                        continue
                
                # Dietary tag filter
                if "dietary_tag" in filters:
                    if not recipe.has_dietary_tag(filters["dietary_tag"]):
                        continue
                
                # Max time filter
                if "max_time" in filters:
                    if recipe.total_time() > filters["max_time"]:
                        continue
                
                # Cuisine filter
                if "cuisine" in filters:
                    if recipe.cuisine.lower() != filters["cuisine"].lower():
                        continue
            
            results.append(recipe)
        
        return results
    
    def get_recipes_by_ingredient(self, ingredient_name: str) -> List[Recipe]:
        """Find recipes containing ingredient"""
        ingredient_lower = ingredient_name.lower()
        return [r for r in self.recipes.values()
                if any(ingredient_lower in ing.name.lower() for ing in r.ingredients)]
    
    def get_quick_recipes(self, max_minutes: int = 30) -> List[Recipe]:
        """Get recipes under time limit"""
        return [r for r in self.recipes.values() if r.total_time() <= max_minutes]
    
    def save_recipes(self):
        """Save recipes to file"""
        data = []
        for recipe in self.recipes.values():
            recipe_dict = {
                "id": recipe.id,
                "name": recipe.name,
                "description": recipe.description,
                "ingredients": [
                    {
                        "name": ing.name,
                        "quantity": ing.quantity,
                        "unit": ing.unit.value,
                        "notes": ing.notes
                    }
                    for ing in recipe.ingredients
                ],
                "instructions": recipe.instructions,
                "servings": recipe.servings,
                "prep_time_minutes": recipe.prep_time_minutes,
                "cook_time_minutes": recipe.cook_time_minutes,
                "meal_types": [mt.value for mt in recipe.meal_types],
                "dietary_tags": [dt.value for dt in recipe.dietary_tags],
                "cuisine": recipe.cuisine,
                "nutrition": recipe.nutrition.__dict__ if recipe.nutrition else None,
                "rating": recipe.rating
            }
            data.append(recipe_dict)
        
        (self.data_dir / "recipes.json").write_text(json.dumps(data, indent=2))
    
    def load_recipes(self):
        """Load recipes from file"""
        file_path = self.data_dir / "recipes.json"
        if not file_path.exists():
            return
        
        data = json.loads(file_path.read_text())
        
        for recipe_dict in data:
            ingredients = [
                Ingredient(
                    name=ing["name"],
                    quantity=ing["quantity"],
                    unit=MeasurementUnit(ing["unit"]),
                    notes=ing.get("notes", "")
                )
                for ing in recipe_dict["ingredients"]
            ]
            
            nutrition = None
            if recipe_dict.get("nutrition"):
                nutrition = NutritionInfo(**recipe_dict["nutrition"])
            
            recipe = Recipe(
                id=recipe_dict["id"],
                name=recipe_dict["name"],
                description=recipe_dict["description"],
                ingredients=ingredients,
                instructions=recipe_dict["instructions"],
                servings=recipe_dict["servings"],
                prep_time_minutes=recipe_dict["prep_time_minutes"],
                cook_time_minutes=recipe_dict["cook_time_minutes"],
                meal_types=[MealType(mt) for mt in recipe_dict["meal_types"]],
                dietary_tags=[DietaryTag(dt) for dt in recipe_dict["dietary_tags"]],
                cuisine=recipe_dict.get("cuisine", ""),
                nutrition=nutrition,
                rating=recipe_dict.get("rating", 0.0)
            )
            
            self.recipes[recipe.id] = recipe
```

## Meal Planner

```python
# meal_planner.py
from collections import defaultdict

class MealPlanner:
    """Meal planning system"""
    
    def __init__(self, recipe_manager: RecipeManager, data_dir: str = "recipe_data"):
        self.recipe_manager = recipe_manager
        self.data_dir = Path(data_dir)
        self.data_dir.mkdir(exist_ok=True)
        
        self.meal_plans: List[MealPlan] = []
        self.load_meal_plans()
    
    def add_meal(self, meal_plan: MealPlan) -> MealPlan:
        """Add meal to plan"""
        # Validate recipe exists
        if not self.recipe_manager.get_recipe(meal_plan.recipe_id):
            raise ValueError(f"Recipe {meal_plan.recipe_id} not found")
        
        # Check for duplicate
        for existing in self.meal_plans:
            if (existing.date == meal_plan.date and 
                existing.meal_type == meal_plan.meal_type):
                raise ValueError(f"{meal_plan.meal_type.value} already planned for {meal_plan.date}")
        
        self.meal_plans.append(meal_plan)
        self.save_meal_plans()
        return meal_plan
    
    def remove_meal(self, meal_plan_id: str) -> bool:
        """Remove meal from plan"""
        for i, plan in enumerate(self.meal_plans):
            if plan.id == meal_plan_id:
                del self.meal_plans[i]
                self.save_meal_plans()
                return True
        return False
    
    def get_week_plan(self, start_date: date) -> Dict[date, Dict[MealType, MealPlan]]:
        """Get meal plan for week"""
        week_dates = [start_date + timedelta(days=i) for i in range(7)]
        
        plan = {}
        for d in week_dates:
            plan[d] = {}
        
        for meal_plan in self.meal_plans:
            if meal_plan.date in week_dates:
                plan[meal_plan.date][meal_plan.meal_type] = meal_plan
        
        return plan
    
    def get_meals_for_date(self, check_date: date) -> List[MealPlan]:
        """Get all meals for specific date"""
        return [mp for mp in self.meal_plans if mp.date == check_date]
    
    def generate_shopping_list(self, start_date: date, days: int = 7) -> List[ShoppingListItem]:
        """Generate shopping list for date range"""
        end_date = start_date + timedelta(days=days - 1)
        
        # Get meals in range
        meals = [mp for mp in self.meal_plans 
                if start_date <= mp.date <= end_date]
        
        # Aggregate ingredients
        ingredient_map = defaultdict(lambda: {"quantity": 0, "unit": None, "recipes": []})
        
        for meal_plan in meals:
            recipe = self.recipe_manager.get_recipe(meal_plan.recipe_id)
            if not recipe:
                continue
            
            # Scale recipe if needed
            if meal_plan.servings != recipe.servings:
                recipe = recipe.scale_recipe(meal_plan.servings)
            
            for ingredient in recipe.ingredients:
                key = (ingredient.name.lower(), ingredient.unit)
                ingredient_map[key]["quantity"] += ingredient.quantity
                ingredient_map[key]["unit"] = ingredient.unit
                ingredient_map[key]["recipes"].append(recipe.name)
        
        # Create shopping list items
        shopping_list = []
        for (name, unit), data in ingredient_map.items():
            item = ShoppingListItem(
                ingredient_name=name,
                quantity=round(data["quantity"], 2),
                unit=data["unit"],
                recipes=list(set(data["recipes"]))
            )
            shopping_list.append(item)
        
        return sorted(shopping_list, key=lambda x: x.ingredient_name)
    
    def get_weekly_nutrition(self, start_date: date) -> Dict[str, NutritionInfo]:
        """Calculate weekly nutrition totals"""
        week_dates = [start_date + timedelta(days=i) for i in range(7)]
        
        daily_totals = {}
        
        for check_date in week_dates:
            meals = self.get_meals_for_date(check_date)
            
            total = NutritionInfo(
                calories=0,
                protein_g=0,
                carbs_g=0,
                fat_g=0,
                fiber_g=0,
                sugar_g=0,
                sodium_mg=0
            )
            
            for meal_plan in meals:
                recipe = self.recipe_manager.get_recipe(meal_plan.recipe_id)
                if recipe and recipe.nutrition:
                    # Scale to meal plan servings
                    factor = meal_plan.servings / recipe.servings
                    nutrition = recipe.nutrition.scale(factor)
                    
                    total.calories += nutrition.calories
                    total.protein_g += nutrition.protein_g
                    total.carbs_g += nutrition.carbs_g
                    total.fat_g += nutrition.fat_g
                    total.fiber_g += nutrition.fiber_g
                    total.sugar_g += nutrition.sugar_g
                    total.sodium_mg += nutrition.sodium_mg
            
            daily_totals[check_date.strftime("%A")] = total
        
        return daily_totals
    
    def save_meal_plans(self):
        """Save meal plans to file"""
        data = [
            {
                "id": mp.id,
                "date": mp.date.isoformat(),
                "meal_type": mp.meal_type.value,
                "recipe_id": mp.recipe_id,
                "servings": mp.servings,
                "notes": mp.notes
            }
            for mp in self.meal_plans
        ]
        
        (self.data_dir / "meal_plans.json").write_text(json.dumps(data, indent=2))
    
    def load_meal_plans(self):
        """Load meal plans from file"""
        file_path = self.data_dir / "meal_plans.json"
        if not file_path.exists():
            return
        
        data = json.loads(file_path.read_text())
        
        for mp_dict in data:
            meal_plan = MealPlan(
                id=mp_dict["id"],
                date=date.fromisoformat(mp_dict["date"]),
                meal_type=MealType(mp_dict["meal_type"]),
                recipe_id=mp_dict["recipe_id"],
                servings=mp_dict["servings"],
                notes=mp_dict.get("notes", "")
            )
            self.meal_plans.append(meal_plan)
```

## CLI Application

```python
# cli.py

def run_recipe_manager():
    """Main recipe manager interface"""
    recipe_mgr = RecipeManager()
    meal_planner = MealPlanner(recipe_mgr)
    
    while True:
        print("\n" + "="*70)
        print("RECIPE MANAGER & MEAL PLANNER")
        print("="*70)
        print("Recipes:  1. Add   2. Search   3. View")
        print("Planning: 4. Plan Meal   5. View Week   6. Shopping List")
        print("7. Exit")
        print("="*70)
        
        choice = input("\nChoice: ").strip()
        
        try:
            if choice == "1":
                # Add recipe
                print("\n--- Add Recipe ---")
                name = input("Name: ")
                description = input("Description: ")
                servings = int(input("Servings: "))
                prep_time = int(input("Prep time (minutes): "))
                cook_time = int(input("Cook time (minutes): "))
                
                # Ingredients
                ingredients = []
                print("\nIngredients (type 'done' when finished):")
                while True:
                    ing_name = input("  Ingredient name: ")
                    if ing_name.lower() == "done":
                        break
                    
                    quantity = float(input("  Quantity: "))
                    unit = input("  Unit (cup/tablespoon/gram/etc): ")
                    
                    ingredients.append(Ingredient(
                        name=ing_name,
                        quantity=quantity,
                        unit=MeasurementUnit(unit)
                    ))
                
                # Instructions
                instructions = []
                print("\nInstructions (type 'done' when finished):")
                step = 1
                while True:
                    instruction = input(f"  Step {step}: ")
                    if instruction.lower() == "done":
                        break
                    instructions.append(instruction)
                    step += 1
                
                # Meal types
                print("\nMeal types (breakfast/lunch/dinner/snack, comma-separated):")
                meal_types_str = input("  ")
                meal_types = [MealType(mt.strip()) for mt in meal_types_str.split(",")]
                
                recipe = Recipe(
                    id=str(uuid.uuid4()),
                    name=name,
                    description=description,
                    ingredients=ingredients,
                    instructions=instructions,
                    servings=servings,
                    prep_time_minutes=prep_time,
                    cook_time_minutes=cook_time,
                    meal_types=meal_types,
                    dietary_tags=[]
                )
                
                recipe_mgr.add_recipe(recipe)
                print(f"\n✓ Added recipe: {recipe.name}")
            
            elif choice == "2":
                # Search recipes
                query = input("\nSearch: ")
                results = recipe_mgr.search_recipes(query)
                
                if results:
                    print(f"\nFound {len(results)} recipes:")
                    for recipe in results:
                        print(f"- {recipe.name} ({recipe.total_time()} min)")
                else:
                    print("No recipes found")
            
            elif choice == "4":
                # Plan meal
                print("\n--- Plan Meal ---")
                meal_date = input("Date (YYYY-MM-DD): ")
                meal_date = date.fromisoformat(meal_date)
                
                meal_type_str = input("Meal type (breakfast/lunch/dinner/snack): ")
                meal_type = MealType(meal_type_str)
                
                # Show matching recipes
                recipes = recipe_mgr.search_recipes("", filters={"meal_type": meal_type})
                
                if not recipes:
                    print("No recipes found for this meal type")
                    continue
                
                print("\nAvailable recipes:")
                for i, recipe in enumerate(recipes, 1):
                    print(f"{i}. {recipe.name}")
                
                num = int(input("\nSelect recipe: "))
                if 1 <= num <= len(recipes):
                    recipe = recipes[num - 1]
                    servings = int(input(f"Servings (recipe makes {recipe.servings}): "))
                    
                    meal_plan = MealPlan(
                        id=str(uuid.uuid4()),
                        date=meal_date,
                        meal_type=meal_type,
                        recipe_id=recipe.id,
                        servings=servings
                    )
                    
                    meal_planner.add_meal(meal_plan)
                    print(f"\n✓ Planned: {recipe.name} for {meal_date}")
            
            elif choice == "6":
                # Shopping list
                start_date_str = input("\nStart date (YYYY-MM-DD, or Enter for today): ")
                start_date = date.fromisoformat(start_date_str) if start_date_str else date.today()
                
                days = int(input("Number of days (default 7): ") or "7")
                
                shopping_list = meal_planner.generate_shopping_list(start_date, days)
                
                if shopping_list:
                    print(f"\n--- Shopping List ({start_date} to {start_date + timedelta(days=days-1)}) ---")
                    for item in shopping_list:
                        print(str(item))
                else:
                    print("\nNo meals planned for this period")
            
            elif choice == "7":
                print("\nHappy cooking!")
                break
        
        except ValueError as e:
            print(f"\n✗ Error: {e}")
        except Exception as e:
            print(f"\n✗ Unexpected error: {e}")

if __name__ == "__main__":
    run_recipe_manager()
```

## Summary

Built comprehensive recipe manager with:
- Recipe storage with ingredients
- Meal planning calendar
- Shopping list generation
- Nutrition tracking
- Recipe scaling
- Search and filters

**Skills Applied:**
- Complex data modeling
- Enums for types
- Data aggregation
- Business logic
- File persistence
- Collection operations
