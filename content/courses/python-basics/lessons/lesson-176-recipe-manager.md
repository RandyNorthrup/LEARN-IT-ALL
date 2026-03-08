---
id: lesson-176-recipe-manager
title: "Recipe Manager with Meal Planning"
chapterId: ch13-practice
order: 11
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
from datetime import date, timedelta
from typing import List, Dict, Optional, Set
import uuid

# Meal type constants
MEAL_BREAKFAST = "breakfast"
MEAL_LUNCH = "lunch"
MEAL_DINNER = "dinner"
MEAL_SNACK = "snack"

# Dietary tag constants
DIET_VEGETARIAN = "vegetarian"
DIET_VEGAN = "vegan"
DIET_GLUTEN_FREE = "gluten_free"
DIET_DAIRY_FREE = "dairy_free"
DIET_NUT_FREE = "nut_free"
DIET_LOW_CARB = "low_carb"
DIET_KETO = "keto"
DIET_PALEO = "paleo"

# Measurement unit constants
UNIT_CUP = "cup"
UNIT_TABLESPOON = "tablespoon"
UNIT_TEASPOON = "teaspoon"
UNIT_GRAM = "gram"
UNIT_KILOGRAM = "kilogram"
UNIT_OUNCE = "ounce"
UNIT_POUND = "pound"
UNIT_MILLILITER = "milliliter"
UNIT_LITER = "liter"
UNIT_PIECE = "piece"
UNIT_PINCH = "pinch"


def create_ingredient(name, quantity, unit, notes=""):
    """Create a recipe ingredient"""
    return {
        "name": name,
        "quantity": quantity,
        "unit": unit,
        "notes": notes,
    }


def format_ingredient(ingredient):
    """Format ingredient as readable string"""
    return f"{ingredient['quantity']} {ingredient['unit']} {ingredient['name']}"


def scale_ingredient(ingredient, factor):
    """Scale ingredient quantity by factor"""
    return create_ingredient(
        name=ingredient["name"],
        quantity=ingredient["quantity"] * factor,
        unit=ingredient["unit"],
        notes=ingredient["notes"],
    )


def create_nutrition(calories, protein_g, carbs_g, fat_g,
                     fiber_g=0, sugar_g=0, sodium_mg=0):
    """Create nutritional information per serving"""
    return {
        "calories": calories,
        "protein_g": protein_g,
        "carbs_g": carbs_g,
        "fat_g": fat_g,
        "fiber_g": fiber_g,
        "sugar_g": sugar_g,
        "sodium_mg": sodium_mg,
    }


def scale_nutrition(nutrition, factor):
    """Scale nutrition values by factor"""
    return create_nutrition(
        calories=int(nutrition["calories"] * factor),
        protein_g=round(nutrition["protein_g"] * factor, 1),
        carbs_g=round(nutrition["carbs_g"] * factor, 1),
        fat_g=round(nutrition["fat_g"] * factor, 1),
        fiber_g=round(nutrition["fiber_g"] * factor, 1),
        sugar_g=round(nutrition["sugar_g"] * factor, 1),
        sodium_mg=round(nutrition["sodium_mg"] * factor, 1),
    )


def create_recipe(name, description, ingredients, instructions, servings,
                  prep_time_minutes, cook_time_minutes, meal_types,
                  dietary_tags, cuisine="", nutrition=None, rating=0.0,
                  recipe_id=None):
    """Create a complete recipe"""
    return {
        "id": recipe_id or str(uuid.uuid4()),
        "name": name,
        "description": description,
        "ingredients": ingredients,
        "instructions": instructions,
        "servings": servings,
        "prep_time_minutes": prep_time_minutes,
        "cook_time_minutes": cook_time_minutes,
        "meal_types": meal_types,
        "dietary_tags": dietary_tags,
        "cuisine": cuisine,
        "nutrition": nutrition,
        "rating": rating,
    }


def recipe_total_time(recipe):
    """Total time in minutes"""
    return recipe["prep_time_minutes"] + recipe["cook_time_minutes"]


def scale_recipe(recipe, new_servings):
    """Scale recipe to new serving size"""
    factor = new_servings / recipe["servings"]

    scaled_ingredients = [scale_ingredient(ing, factor)
                         for ing in recipe["ingredients"]]
    scaled_nutrition = (scale_nutrition(recipe["nutrition"], factor)
                       if recipe["nutrition"] else None)

    return create_recipe(
        recipe_id=recipe["id"],
        name=recipe["name"],
        description=recipe["description"],
        ingredients=scaled_ingredients,
        instructions=recipe["instructions"],
        servings=new_servings,
        prep_time_minutes=recipe["prep_time_minutes"],
        cook_time_minutes=recipe["cook_time_minutes"],
        meal_types=recipe["meal_types"],
        dietary_tags=recipe["dietary_tags"],
        cuisine=recipe["cuisine"],
        nutrition=scaled_nutrition,
        rating=recipe["rating"],
    )


def recipe_has_dietary_tag(recipe, tag):
    """Check if recipe has dietary tag"""
    return tag in recipe["dietary_tags"]


def recipe_matches_meal_type(recipe, meal_type):
    """Check if recipe is for meal type"""
    return meal_type in recipe["meal_types"]


def create_meal_plan(meal_date, meal_type, recipe_id, servings,
                     notes="", plan_id=None):
    """Create a meal plan entry"""
    return {
        "id": plan_id or str(uuid.uuid4()),
        "date": meal_date,
        "meal_type": meal_type,
        "recipe_id": recipe_id,
        "servings": servings,
        "notes": notes,
    }


def create_shopping_item(ingredient_name, quantity, unit,
                         recipes=None, purchased=False):
    """Create a shopping list item"""
    return {
        "ingredient_name": ingredient_name,
        "quantity": quantity,
        "unit": unit,
        "recipes": recipes if recipes is not None else [],
        "purchased": purchased,
    }


def format_shopping_item(item):
    """Format shopping list item as readable string"""
    recipes_str = (f" (for: {', '.join(item['recipes'])})"
                  if item["recipes"] else "")
    status = "✓" if item["purchased"] else "☐"
    return f"{status} {item['quantity']} {item['unit']} {item['ingredient_name']}{recipes_str}"
```

## Recipe Manager

```python
# recipe_manager.py
import json
from pathlib import Path
from typing import List, Dict, Optional


def create_recipe_manager(data_dir="recipe_data"):
    """Create and initialize a recipe manager state"""
    data_path = Path(data_dir)
    data_path.mkdir(exist_ok=True)

    manager = {
        "data_dir": data_path,
        "recipes": {},
    }

    load_recipes(manager)
    return manager


def add_recipe(manager, recipe):
    """Add recipe to collection"""
    # Check for duplicate name
    for r in manager["recipes"].values():
        if r["name"].lower() == recipe["name"].lower():
            raise ValueError(f"Recipe '{recipe['name']}' already exists")

    manager["recipes"][recipe["id"]] = recipe
    save_recipes(manager)
    return recipe


def update_recipe(manager, recipe):
    """Update existing recipe"""
    if recipe["id"] not in manager["recipes"]:
        raise ValueError(f"Recipe {recipe['id']} not found")

    manager["recipes"][recipe["id"]] = recipe
    save_recipes(manager)


def delete_recipe(manager, recipe_id):
    """Delete recipe"""
    if recipe_id in manager["recipes"]:
        del manager["recipes"][recipe_id]
        save_recipes(manager)
        return True
    return False


def get_recipe(manager, recipe_id):
    """Get recipe by ID"""
    return manager["recipes"].get(recipe_id)


def search_recipes(manager, query, filters=None):
    """Search recipes with filters"""
    query_lower = query.lower()
    results = []

    for recipe in manager["recipes"].values():
        # Text search
        if query and (query_lower not in recipe["name"].lower() and
                      query_lower not in recipe["description"].lower()):
            continue

        # Apply filters
        if filters:
            # Meal type filter
            if "meal_type" in filters:
                if not recipe_matches_meal_type(recipe, filters["meal_type"]):
                    continue

            # Dietary tag filter
            if "dietary_tag" in filters:
                if not recipe_has_dietary_tag(recipe, filters["dietary_tag"]):
                    continue

            # Max time filter
            if "max_time" in filters:
                if recipe_total_time(recipe) > filters["max_time"]:
                    continue

            # Cuisine filter
            if "cuisine" in filters:
                if recipe["cuisine"].lower() != filters["cuisine"].lower():
                    continue

        results.append(recipe)

    return results


def get_recipes_by_ingredient(manager, ingredient_name):
    """Find recipes containing ingredient"""
    ingredient_lower = ingredient_name.lower()
    return [r for r in manager["recipes"].values()
            if any(ingredient_lower in ing["name"].lower()
                   for ing in r["ingredients"])]


def get_quick_recipes(manager, max_minutes=30):
    """Get recipes under time limit"""
    return [r for r in manager["recipes"].values()
            if recipe_total_time(r) <= max_minutes]


def save_recipes(manager):
    """Save recipes to file"""
    data = []
    for recipe in manager["recipes"].values():
        recipe_dict = {
            "id": recipe["id"],
            "name": recipe["name"],
            "description": recipe["description"],
            "ingredients": recipe["ingredients"],
            "instructions": recipe["instructions"],
            "servings": recipe["servings"],
            "prep_time_minutes": recipe["prep_time_minutes"],
            "cook_time_minutes": recipe["cook_time_minutes"],
            "meal_types": recipe["meal_types"],
            "dietary_tags": recipe["dietary_tags"],
            "cuisine": recipe["cuisine"],
            "nutrition": recipe["nutrition"],
            "rating": recipe["rating"],
        }
        data.append(recipe_dict)

    (manager["data_dir"] / "recipes.json").write_text(json.dumps(data, indent=2))


def load_recipes(manager):
    """Load recipes from file"""
    file_path = manager["data_dir"] / "recipes.json"
    if not file_path.exists():
        return

    data = json.loads(file_path.read_text())

    for recipe_dict in data:
        manager["recipes"][recipe_dict["id"]] = recipe_dict
```

## Meal Planner

```python
# meal_planner.py
from collections import defaultdict


def create_meal_planner(recipe_manager, data_dir="recipe_data"):
    """Create and initialize a meal planning system state"""
    data_path = Path(data_dir)
    data_path.mkdir(exist_ok=True)

    planner = {
        "recipe_manager": recipe_manager,
        "data_dir": data_path,
        "meal_plans": [],
    }

    load_meal_plans(planner)
    return planner


def add_meal(planner, meal_plan_entry):
    """Add meal to plan"""
    # Validate recipe exists
    if not get_recipe(planner["recipe_manager"], meal_plan_entry["recipe_id"]):
        raise ValueError(f"Recipe {meal_plan_entry['recipe_id']} not found")

    # Check for duplicate
    for existing in planner["meal_plans"]:
        if (existing["date"] == meal_plan_entry["date"] and
            existing["meal_type"] == meal_plan_entry["meal_type"]):
            raise ValueError(
                f"{meal_plan_entry['meal_type']} already planned "
                f"for {meal_plan_entry['date']}"
            )

    planner["meal_plans"].append(meal_plan_entry)
    save_meal_plans(planner)
    return meal_plan_entry


def remove_meal(planner, meal_plan_id):
    """Remove meal from plan"""
    for i, plan in enumerate(planner["meal_plans"]):
        if plan["id"] == meal_plan_id:
            del planner["meal_plans"][i]
            save_meal_plans(planner)
            return True
    return False


def get_week_plan(planner, start_date):
    """Get meal plan for week"""
    week_dates = [start_date + timedelta(days=i) for i in range(7)]

    plan = {}
    for d in week_dates:
        plan[d] = {}

    for meal_plan_entry in planner["meal_plans"]:
        if meal_plan_entry["date"] in week_dates:
            plan[meal_plan_entry["date"]][meal_plan_entry["meal_type"]] = meal_plan_entry

    return plan


def get_meals_for_date(planner, check_date):
    """Get all meals for specific date"""
    return [mp for mp in planner["meal_plans"] if mp["date"] == check_date]


def generate_shopping_list(planner, start_date, days=7):
    """Generate shopping list for date range"""
    end_date = start_date + timedelta(days=days - 1)

    # Get meals in range
    meals = [mp for mp in planner["meal_plans"]
            if start_date <= mp["date"] <= end_date]

    # Aggregate ingredients
    ingredient_map = defaultdict(
        lambda: {"quantity": 0, "unit": None, "recipes": []}
    )

    for meal_plan_entry in meals:
        recipe = get_recipe(planner["recipe_manager"], meal_plan_entry["recipe_id"])
        if not recipe:
            continue

        # Scale recipe if needed
        if meal_plan_entry["servings"] != recipe["servings"]:
            recipe = scale_recipe(recipe, meal_plan_entry["servings"])

        for ingredient in recipe["ingredients"]:
            key = (ingredient["name"].lower(), ingredient["unit"])
            ingredient_map[key]["quantity"] += ingredient["quantity"]
            ingredient_map[key]["unit"] = ingredient["unit"]
            ingredient_map[key]["recipes"].append(recipe["name"])

    # Create shopping list items
    shopping_list = []
    for (name, unit), data in ingredient_map.items():
        item = create_shopping_item(
            ingredient_name=name,
            quantity=round(data["quantity"], 2),
            unit=data["unit"],
            recipes=list(set(data["recipes"])),
        )
        shopping_list.append(item)

    return sorted(shopping_list, key=lambda x: x["ingredient_name"])


def get_weekly_nutrition(planner, start_date):
    """Calculate weekly nutrition totals"""
    week_dates = [start_date + timedelta(days=i) for i in range(7)]

    daily_totals = {}

    for check_date in week_dates:
        meals = get_meals_for_date(planner, check_date)

        total = create_nutrition(
            calories=0, protein_g=0, carbs_g=0, fat_g=0,
            fiber_g=0, sugar_g=0, sodium_mg=0,
        )

        for meal_plan_entry in meals:
            recipe = get_recipe(
                planner["recipe_manager"], meal_plan_entry["recipe_id"]
            )
            if recipe and recipe["nutrition"]:
                # Scale to meal plan servings
                factor = meal_plan_entry["servings"] / recipe["servings"]
                nutrition = scale_nutrition(recipe["nutrition"], factor)

                total["calories"] += nutrition["calories"]
                total["protein_g"] += nutrition["protein_g"]
                total["carbs_g"] += nutrition["carbs_g"]
                total["fat_g"] += nutrition["fat_g"]
                total["fiber_g"] += nutrition["fiber_g"]
                total["sugar_g"] += nutrition["sugar_g"]
                total["sodium_mg"] += nutrition["sodium_mg"]

        daily_totals[check_date.strftime("%A")] = total

    return daily_totals


def save_meal_plans(planner):
    """Save meal plans to file"""
    data = [
        {
            "id": mp["id"],
            "date": mp["date"].isoformat(),
            "meal_type": mp["meal_type"],
            "recipe_id": mp["recipe_id"],
            "servings": mp["servings"],
            "notes": mp["notes"],
        }
        for mp in planner["meal_plans"]
    ]

    (planner["data_dir"] / "meal_plans.json").write_text(json.dumps(data, indent=2))


def load_meal_plans(planner):
    """Load meal plans from file"""
    file_path = planner["data_dir"] / "meal_plans.json"
    if not file_path.exists():
        return

    data = json.loads(file_path.read_text())

    for mp_dict in data:
        meal_plan_entry = {
            "id": mp_dict["id"],
            "date": date.fromisoformat(mp_dict["date"]),
            "meal_type": mp_dict["meal_type"],
            "recipe_id": mp_dict["recipe_id"],
            "servings": mp_dict["servings"],
            "notes": mp_dict.get("notes", ""),
        }
        planner["meal_plans"].append(meal_plan_entry)
```

## CLI Application

```python
# cli.py

def run_recipe_manager():
    """Main recipe manager interface"""
    recipe_mgr = create_recipe_manager()
    meal_planner_state = create_meal_planner(recipe_mgr)

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

                    ingredients.append(create_ingredient(
                        name=ing_name,
                        quantity=quantity,
                        unit=unit,
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
                meal_types = [mt.strip() for mt in meal_types_str.split(",")]

                recipe = create_recipe(
                    recipe_id=str(uuid.uuid4()),
                    name=name,
                    description=description,
                    ingredients=ingredients,
                    instructions=instructions,
                    servings=servings,
                    prep_time_minutes=prep_time,
                    cook_time_minutes=cook_time,
                    meal_types=meal_types,
                    dietary_tags=[],
                )

                add_recipe(recipe_mgr, recipe)
                print(f"\n✓ Added recipe: {recipe['name']}")

            elif choice == "2":
                # Search recipes
                query = input("\nSearch: ")
                results = search_recipes(recipe_mgr, query)

                if results:
                    print(f"\nFound {len(results)} recipes:")
                    for recipe in results:
                        print(f"- {recipe['name']} ({recipe_total_time(recipe)} min)")
                else:
                    print("No recipes found")

            elif choice == "4":
                # Plan meal
                print("\n--- Plan Meal ---")
                meal_date = input("Date (YYYY-MM-DD): ")
                meal_date = date.fromisoformat(meal_date)

                meal_type_str = input("Meal type (breakfast/lunch/dinner/snack): ")

                # Show matching recipes
                recipes = search_recipes(
                    recipe_mgr, "", filters={"meal_type": meal_type_str}
                )

                if not recipes:
                    print("No recipes found for this meal type")
                    continue

                print("\nAvailable recipes:")
                for i, recipe in enumerate(recipes, 1):
                    print(f"{i}. {recipe['name']}")

                num = int(input("\nSelect recipe: "))
                if 1 <= num <= len(recipes):
                    recipe = recipes[num - 1]
                    servings = int(input(
                        f"Servings (recipe makes {recipe['servings']}): "
                    ))

                    entry = create_meal_plan(
                        plan_id=str(uuid.uuid4()),
                        meal_date=meal_date,
                        meal_type=meal_type_str,
                        recipe_id=recipe["id"],
                        servings=servings,
                    )

                    add_meal(meal_planner_state, entry)
                    print(f"\n✓ Planned: {recipe['name']} for {meal_date}")

            elif choice == "6":
                # Shopping list
                start_date_str = input(
                    "\nStart date (YYYY-MM-DD, or Enter for today): "
                )
                start_date = (date.fromisoformat(start_date_str)
                             if start_date_str else date.today())

                days = int(input("Number of days (default 7): ") or "7")

                shopping_list = generate_shopping_list(
                    meal_planner_state, start_date, days
                )

                if shopping_list:
                    print(f"\n--- Shopping List ({start_date} to "
                          f"{start_date + timedelta(days=days-1)}) ---")
                    for item in shopping_list:
                        print(format_shopping_item(item))
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
- Constants for category types
- Data aggregation
- Business logic
- File persistence
- Collection operations
