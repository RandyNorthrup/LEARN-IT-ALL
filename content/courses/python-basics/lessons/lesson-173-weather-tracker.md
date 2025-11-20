---
id: "172-weather-tracker"
title: "Weather Data Tracker"
chapterId: ch13-practice
order: 9
duration: 30
objectives:
  - Track weather data
  - Calculate statistics
  - Generate forecasts
  - Visualize trends
---

# Weather Data Tracker

Build a weather tracking system for recording and analyzing weather data.

## Project Overview

Create weather tracker that:
- Records daily weather observations
- Calculates statistics (avg, min, max)
- Identifies trends
- Generates reports
- Exports data formats

## Core Data Model

### Weather Entry

```python
# weather_model.py
from dataclasses import dataclass
from datetime import datetime, date
from typing import Optional, List
import json
from pathlib import Path

@dataclass
class WeatherEntry:
    """Single weather observation"""
    date: date
    temperature_high: float  # °F
    temperature_low: float
    humidity: int  # percentage
    precipitation: float  # inches
    wind_speed: float  # mph
    conditions: str  # sunny, cloudy, rainy, etc.
    notes: Optional[str] = None
    
    def __post_init__(self):
        """Validate data"""
        if self.temperature_high < self.temperature_low:
            raise ValueError("High temperature cannot be less than low")
        
        if not 0 <= self.humidity <= 100:
            raise ValueError("Humidity must be between 0 and 100")
        
        if self.precipitation < 0:
            raise ValueError("Precipitation cannot be negative")
        
        if self.wind_speed < 0:
            raise ValueError("Wind speed cannot be negative")
    
    @property
    def temperature_avg(self) -> float:
        """Average temperature"""
        return (self.temperature_high + self.temperature_low) / 2
    
    def to_dict(self) -> dict:
        return {
            "date": self.date.isoformat(),
            "temperature_high": self.temperature_high,
            "temperature_low": self.temperature_low,
            "humidity": self.humidity,
            "precipitation": self.precipitation,
            "wind_speed": self.wind_speed,
            "conditions": self.conditions,
            "notes": self.notes
        }
    
    @classmethod
    def from_dict(cls, data: dict) -> 'WeatherEntry':
        return cls(
            date=date.fromisoformat(data["date"]),
            temperature_high=float(data["temperature_high"]),
            temperature_low=float(data["temperature_low"]),
            humidity=int(data["humidity"]),
            precipitation=float(data["precipitation"]),
            wind_speed=float(data["wind_speed"]),
            conditions=data["conditions"],
            notes=data.get("notes")
        )

class WeatherDatabase:
    """Store weather entries"""
    
    def __init__(self, db_file: str = "weather.json"):
        self.db_file = db_file
        self.entries: List[WeatherEntry] = []
        self.load()
    
    def add_entry(self, entry: WeatherEntry):
        """Add weather entry"""
        # Check for duplicate date
        if any(e.date == entry.date for e in self.entries):
            raise ValueError(f"Entry for {entry.date} already exists")
        
        self.entries.append(entry)
        self.entries.sort(key=lambda e: e.date)
        self.save()
    
    def get_entry(self, entry_date: date) -> Optional[WeatherEntry]:
        """Get entry by date"""
        for entry in self.entries:
            if entry.date == entry_date:
                return entry
        return None
    
    def update_entry(self, entry_date: date, **kwargs):
        """Update entry fields"""
        entry = self.get_entry(entry_date)
        if not entry:
            raise ValueError(f"No entry for {entry_date}")
        
        for key, value in kwargs.items():
            if hasattr(entry, key) and value is not None:
                setattr(entry, key, value)
        
        self.save()
    
    def delete_entry(self, entry_date: date) -> bool:
        """Delete entry"""
        for i, entry in enumerate(self.entries):
            if entry.date == entry_date:
                self.entries.pop(i)
                self.save()
                return True
        return False
    
    def get_entries_in_range(self, start: date, end: date) -> List[WeatherEntry]:
        """Get entries within date range"""
        return [e for e in self.entries if start <= e.date <= end]
    
    def get_all(self) -> List[WeatherEntry]:
        """Get all entries sorted by date"""
        return sorted(self.entries, key=lambda e: e.date)
    
    def save(self):
        """Save to file"""
        data = [entry.to_dict() for entry in self.entries]
        Path(self.db_file).write_text(json.dumps(data, indent=2))
    
    def load(self):
        """Load from file"""
        if not Path(self.db_file).exists():
            self.entries = []
            return
        
        try:
            data = json.loads(Path(self.db_file).read_text())
            self.entries = [WeatherEntry.from_dict(e) for e in data]
        except (json.JSONDecodeError, KeyError, ValueError):
            self.entries = []
```

### Weather Statistics

```python
# statistics.py
from datetime import date, timedelta
from typing import Dict, List
from collections import Counter

class WeatherStatistics:
    """Calculate weather statistics"""
    
    def __init__(self, database: WeatherDatabase):
        self.db = database
    
    def get_summary(self, start: date, end: date) -> Dict:
        """Get statistical summary for date range"""
        entries = self.db.get_entries_in_range(start, end)
        
        if not entries:
            return {"error": "No data for date range"}
        
        temps_high = [e.temperature_high for e in entries]
        temps_low = [e.temperature_low for e in entries]
        temps_avg = [e.temperature_avg for e in entries]
        humidity_vals = [e.humidity for e in entries]
        precip_vals = [e.precipitation for e in entries]
        wind_vals = [e.wind_speed for e in entries]
        
        return {
            "date_range": {
                "start": start.isoformat(),
                "end": end.isoformat(),
                "days": len(entries)
            },
            "temperature": {
                "avg_high": round(sum(temps_high) / len(temps_high), 1),
                "avg_low": round(sum(temps_low) / len(temps_low), 1),
                "avg_mean": round(sum(temps_avg) / len(temps_avg), 1),
                "max_high": max(temps_high),
                "min_low": min(temps_low)
            },
            "humidity": {
                "average": round(sum(humidity_vals) / len(humidity_vals), 1),
                "max": max(humidity_vals),
                "min": min(humidity_vals)
            },
            "precipitation": {
                "total": round(sum(precip_vals), 2),
                "average": round(sum(precip_vals) / len(precip_vals), 2),
                "max_daily": max(precip_vals),
                "rainy_days": sum(1 for p in precip_vals if p > 0)
            },
            "wind": {
                "average": round(sum(wind_vals) / len(wind_vals), 1),
                "max": max(wind_vals)
            }
        }
    
    def get_monthly_averages(self, year: int, month: int) -> Dict:
        """Get averages for a specific month"""
        start = date(year, month, 1)
        
        # Calculate last day of month
        if month == 12:
            end = date(year + 1, 1, 1) - timedelta(days=1)
        else:
            end = date(year, month + 1, 1) - timedelta(days=1)
        
        return self.get_summary(start, end)
    
    def get_conditions_breakdown(self, start: date, end: date) -> Dict[str, int]:
        """Get count of each weather condition"""
        entries = self.db.get_entries_in_range(start, end)
        conditions = [e.conditions.lower() for e in entries]
        return dict(Counter(conditions))
    
    def find_extremes(self) -> Dict:
        """Find extreme weather records"""
        entries = self.db.get_all()
        
        if not entries:
            return {"error": "No data available"}
        
        hottest = max(entries, key=lambda e: e.temperature_high)
        coldest = min(entries, key=lambda e: e.temperature_low)
        wettest = max(entries, key=lambda e: e.precipitation)
        windiest = max(entries, key=lambda e: e.wind_speed)
        most_humid = max(entries, key=lambda e: e.humidity)
        
        return {
            "hottest_day": {
                "date": hottest.date.isoformat(),
                "temperature": hottest.temperature_high
            },
            "coldest_day": {
                "date": coldest.date.isoformat(),
                "temperature": coldest.temperature_low
            },
            "wettest_day": {
                "date": wettest.date.isoformat(),
                "precipitation": wettest.precipitation
            },
            "windiest_day": {
                "date": windiest.date.isoformat(),
                "wind_speed": windiest.wind_speed
            },
            "most_humid_day": {
                "date": most_humid.date.isoformat(),
                "humidity": most_humid.humidity
            }
        }
    
    def calculate_trends(self, days: int = 7) -> Dict:
        """Calculate recent trends"""
        entries = self.db.get_all()[-days:]
        
        if len(entries) < 2:
            return {"error": "Not enough data for trends"}
        
        # Calculate temperature trend
        temps = [e.temperature_avg for e in entries]
        temp_trend = temps[-1] - temps[0]
        
        # Calculate humidity trend
        humidity = [e.humidity for e in entries]
        humidity_trend = humidity[-1] - humidity[0]
        
        # Calculate precipitation trend
        precip = [e.precipitation for e in entries]
        avg_precip = sum(precip) / len(precip)
        
        return {
            "period_days": len(entries),
            "temperature_trend": {
                "change": round(temp_trend, 1),
                "direction": "warming" if temp_trend > 2 else "cooling" if temp_trend < -2 else "stable"
            },
            "humidity_trend": {
                "change": round(humidity_trend, 1),
                "direction": "increasing" if humidity_trend > 5 else "decreasing" if humidity_trend < -5 else "stable"
            },
            "precipitation_avg": round(avg_precip, 2)
        }
```

### Report Generator

```python
# reports.py

class WeatherReportGenerator:
    """Generate weather reports"""
    
    def __init__(self, database: WeatherDatabase):
        self.db = database
        self.stats = WeatherStatistics(database)
    
    def generate_monthly_report(self, year: int, month: int) -> str:
        """Generate monthly weather report"""
        report = []
        
        month_names = ["", "January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"]
        
        report.append("="*70)
        report.append(f"WEATHER REPORT - {month_names[month]} {year}")
        report.append("="*70)
        report.append("")
        
        # Get summary
        summary = self.stats.get_monthly_averages(year, month)
        
        if "error" in summary:
            report.append(summary["error"])
            return "\n".join(report)
        
        # Temperature section
        report.append("TEMPERATURE")
        report.append("-"*70)
        temp = summary["temperature"]
        report.append(f"Average High:    {temp['avg_high']}°F")
        report.append(f"Average Low:     {temp['avg_low']}°F")
        report.append(f"Average Mean:    {temp['avg_mean']}°F")
        report.append(f"Highest:         {temp['max_high']}°F")
        report.append(f"Lowest:          {temp['min_low']}°F")
        report.append("")
        
        # Precipitation section
        report.append("PRECIPITATION")
        report.append("-"*70)
        precip = summary["precipitation"]
        report.append(f"Total:           {precip['total']}\"")
        report.append(f"Average Daily:   {precip['average']}\"")
        report.append(f"Max Daily:       {precip['max_daily']}\"")
        report.append(f"Rainy Days:      {precip['rainy_days']}")
        report.append("")
        
        # Humidity section
        report.append("HUMIDITY")
        report.append("-"*70)
        humidity = summary["humidity"]
        report.append(f"Average:         {humidity['average']}%")
        report.append(f"Max:             {humidity['max']}%")
        report.append(f"Min:             {humidity['min']}%")
        report.append("")
        
        # Wind section
        report.append("WIND")
        report.append("-"*70)
        wind = summary["wind"]
        report.append(f"Average Speed:   {wind['average']} mph")
        report.append(f"Max Speed:       {wind['max']} mph")
        report.append("")
        
        # Conditions breakdown
        start = date(year, month, 1)
        if month == 12:
            end = date(year + 1, 1, 1) - timedelta(days=1)
        else:
            end = date(year, month + 1, 1) - timedelta(days=1)
        
        conditions = self.stats.get_conditions_breakdown(start, end)
        
        if conditions:
            report.append("CONDITIONS")
            report.append("-"*70)
            for condition, count in sorted(conditions.items(), key=lambda x: x[1], reverse=True):
                percentage = (count / summary['date_range']['days']) * 100
                report.append(f"{condition.capitalize():<15} {count:>3} days ({percentage:>5.1f}%)")
        
        report.append("")
        report.append("="*70)
        
        return "\n".join(report)
    
    def generate_extremes_report(self) -> str:
        """Generate report of record weather events"""
        extremes = self.stats.find_extremes()
        
        if "error" in extremes:
            return extremes["error"]
        
        report = []
        report.append("="*70)
        report.append("WEATHER RECORDS")
        report.append("="*70)
        report.append("")
        
        report.append(f"Hottest Day:     {extremes['hottest_day']['date']}")
        report.append(f"                 {extremes['hottest_day']['temperature']}°F")
        report.append("")
        
        report.append(f"Coldest Day:     {extremes['coldest_day']['date']}")
        report.append(f"                 {extremes['coldest_day']['temperature']}°F")
        report.append("")
        
        report.append(f"Wettest Day:     {extremes['wettest_day']['date']}")
        report.append(f"                 {extremes['wettest_day']['precipitation']}\"")
        report.append("")
        
        report.append(f"Windiest Day:    {extremes['windiest_day']['date']}")
        report.append(f"                 {extremes['windiest_day']['wind_speed']} mph")
        report.append("")
        
        report.append(f"Most Humid Day:  {extremes['most_humid_day']['date']}")
        report.append(f"                 {extremes['most_humid_day']['humidity']}%")
        report.append("")
        report.append("="*70)
        
        return "\n".join(report)
```

### Data Export

```python
# export.py
import csv

class WeatherDataExporter:
    """Export weather data to various formats"""
    
    def __init__(self, database: WeatherDatabase):
        self.db = database
    
    def export_to_csv(self, filename: str, start: date = None, end: date = None):
        """Export data to CSV file"""
        if start and end:
            entries = self.db.get_entries_in_range(start, end)
        else:
            entries = self.db.get_all()
        
        with open(filename, 'w', newline='') as f:
            writer = csv.writer(f)
            
            # Header
            writer.writerow([
                'Date', 'High Temp', 'Low Temp', 'Avg Temp',
                'Humidity', 'Precipitation', 'Wind Speed', 'Conditions', 'Notes'
            ])
            
            # Data
            for entry in entries:
                writer.writerow([
                    entry.date.isoformat(),
                    entry.temperature_high,
                    entry.temperature_low,
                    entry.temperature_avg,
                    entry.humidity,
                    entry.precipitation,
                    entry.wind_speed,
                    entry.conditions,
                    entry.notes or ''
                ])
        
        return len(entries)
    
    def import_from_csv(self, filename: str) -> int:
        """Import data from CSV file"""
        imported = 0
        
        with open(filename, 'r') as f:
            reader = csv.DictReader(f)
            
            for row in reader:
                try:
                    entry = WeatherEntry(
                        date=date.fromisoformat(row['Date']),
                        temperature_high=float(row['High Temp']),
                        temperature_low=float(row['Low Temp']),
                        humidity=int(row['Humidity']),
                        precipitation=float(row['Precipitation']),
                        wind_speed=float(row['Wind Speed']),
                        conditions=row['Conditions'],
                        notes=row.get('Notes') or None
                    )
                    
                    self.db.add_entry(entry)
                    imported += 1
                
                except (ValueError, KeyError) as e:
                    print(f"Skipped row: {e}")
        
        return imported
```

### CLI Application

```python
# cli.py
from datetime import datetime, date

def add_weather_entry(db: WeatherDatabase):
    """Add new weather entry"""
    print("\n--- Add Weather Entry ---")
    
    date_str = input("Date (YYYY-MM-DD) or Enter for today: ").strip()
    entry_date = date.fromisoformat(date_str) if date_str else date.today()
    
    temp_high = float(input("High temperature (°F): "))
    temp_low = float(input("Low temperature (°F): "))
    humidity = int(input("Humidity (%): "))
    precip = float(input("Precipitation (inches): "))
    wind = float(input("Wind speed (mph): "))
    conditions = input("Conditions (sunny/cloudy/rainy/snowy): ").strip()
    notes = input("Notes (optional): ").strip() or None
    
    try:
        entry = WeatherEntry(
            date=entry_date,
            temperature_high=temp_high,
            temperature_low=temp_low,
            humidity=humidity,
            precipitation=precip,
            wind_speed=wind,
            conditions=conditions,
            notes=notes
        )
        
        db.add_entry(entry)
        print("✓ Weather entry added")
    
    except ValueError as e:
        print(f"✗ Error: {e}")

def run_weather_tracker():
    """Main application"""
    db = WeatherDatabase()
    stats = WeatherStatistics(db)
    reporter = WeatherReportGenerator(db)
    exporter = WeatherDataExporter(db)
    
    while True:
        print("\n" + "="*70)
        print("WEATHER TRACKER")
        print("="*70)
        print("1. Add Entry")
        print("2. View Entries")
        print("3. Monthly Report")
        print("4. Weather Records")
        print("5. Recent Trends")
        print("6. Export to CSV")
        print("7. Import from CSV")
        print("8. Exit")
        print("="*70)
        
        choice = input("\nChoice (1-8): ").strip()
        
        if choice == "1":
            add_weather_entry(db)
        
        elif choice == "2":
            entries = db.get_all()
            if not entries:
                print("\nNo entries yet.")
            else:
                print(f"\n{'Date':<12} {'High':<6} {'Low':<6} {'Precip':<8} {'Conditions'}")
                print("-"*70)
                for e in entries[-20:]:  # Last 20
                    print(f"{e.date} {e.temperature_high:>5.1f}° {e.temperature_low:>5.1f}° "
                          f"{e.precipitation:>6.2f}\" {e.conditions}")
        
        elif choice == "3":
            year = int(input("\nYear: "))
            month = int(input("Month (1-12): "))
            report = reporter.generate_monthly_report(year, month)
            print("\n" + report)
        
        elif choice == "4":
            report = reporter.generate_extremes_report()
            print("\n" + report)
        
        elif choice == "5":
            trends = stats.calculate_trends(7)
            if "error" not in trends:
                print(f"\n--- Trends (Last {trends['period_days']} days) ---")
                print(f"Temperature: {trends['temperature_trend']['direction']} ({trends['temperature_trend']['change']:+.1f}°F)")
                print(f"Humidity: {trends['humidity_trend']['direction']} ({trends['humidity_trend']['change']:+.1f}%)")
                print(f"Avg Precipitation: {trends['precipitation_avg']:.2f}\"")
            else:
                print(f"\n{trends['error']}")
        
        elif choice == "6":
            filename = input("\nFilename: ").strip() or "weather_export.csv"
            count = exporter.export_to_csv(filename)
            print(f"✓ Exported {count} entries to {filename}")
        
        elif choice == "7":
            filename = input("\nFilename: ").strip()
            count = exporter.import_from_csv(filename)
            print(f"✓ Imported {count} entries")
        
        elif choice == "8":
            print("\nGoodbye!")
            break

if __name__ == "__main__":
    run_weather_tracker()
```

## Summary

Built complete weather tracking system with:
- Daily weather recording
- Statistical analysis
- Trend calculation
- Report generation
- CSV import/export
- Record tracking

**Skills Applied:**
- Data validation
- Statistics calculation
- Date/time handling
- File I/O
- CSV processing
- Report formatting
