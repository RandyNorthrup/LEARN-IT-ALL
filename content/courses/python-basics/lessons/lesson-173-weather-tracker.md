---
id: lesson-173-weather-tracker
title: "Weather Data Tracker"
chapterId: ch13-practice
order: 8
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
from datetime import datetime, date, timedelta
from typing import Optional, List
import json
from pathlib import Path

def create_weather_entry(entry_date, temperature_high, temperature_low,
                         humidity, precipitation, wind_speed, conditions,
                         notes=None):
    """Create a weather observation dictionary with validation"""
    if temperature_high < temperature_low:
        raise ValueError("High temperature cannot be less than low")

    if not 0 <= humidity <= 100:
        raise ValueError("Humidity must be between 0 and 100")

    if precipitation < 0:
        raise ValueError("Precipitation cannot be negative")

    if wind_speed < 0:
        raise ValueError("Wind speed cannot be negative")

    return {
        "date": entry_date,
        "temperature_high": float(temperature_high),
        "temperature_low": float(temperature_low),
        "humidity": int(humidity),
        "precipitation": float(precipitation),
        "wind_speed": float(wind_speed),
        "conditions": conditions,
        "notes": notes
    }

def temperature_avg(entry):
    """Calculate average temperature for an entry"""
    return (entry["temperature_high"] + entry["temperature_low"]) / 2

def entry_to_dict(entry):
    """Convert entry to serializable dictionary"""
    return {
        "date": entry["date"].isoformat(),
        "temperature_high": entry["temperature_high"],
        "temperature_low": entry["temperature_low"],
        "humidity": entry["humidity"],
        "precipitation": entry["precipitation"],
        "wind_speed": entry["wind_speed"],
        "conditions": entry["conditions"],
        "notes": entry["notes"]
    }

def entry_from_dict(data):
    """Create entry from dictionary (e.g., loaded from JSON)"""
    return create_weather_entry(
        entry_date=date.fromisoformat(data["date"]),
        temperature_high=float(data["temperature_high"]),
        temperature_low=float(data["temperature_low"]),
        humidity=int(data["humidity"]),
        precipitation=float(data["precipitation"]),
        wind_speed=float(data["wind_speed"]),
        conditions=data["conditions"],
        notes=data.get("notes")
    )

def create_weather_database(db_file="weather.json"):
    """Create a weather database state dictionary"""
    db = {
        "db_file": db_file,
        "entries": []
    }
    load_database(db)
    return db

def add_entry(db, entry):
    """Add weather entry to database"""
    # Check for duplicate date
    if any(e["date"] == entry["date"] for e in db["entries"]):
        raise ValueError(f"Entry for {entry['date']} already exists")

    db["entries"].append(entry)
    db["entries"].sort(key=lambda e: e["date"])
    save_database(db)

def get_entry(db, entry_date):
    """Get entry by date"""
    for entry in db["entries"]:
        if entry["date"] == entry_date:
            return entry
    return None

def update_entry(db, entry_date, **kwargs):
    """Update entry fields"""
    entry = get_entry(db, entry_date)
    if not entry:
        raise ValueError(f"No entry for {entry_date}")

    for key, value in kwargs.items():
        if key in entry and value is not None:
            entry[key] = value

    save_database(db)

def delete_entry(db, entry_date):
    """Delete entry"""
    for i, entry in enumerate(db["entries"]):
        if entry["date"] == entry_date:
            db["entries"].pop(i)
            save_database(db)
            return True
    return False

def get_entries_in_range(db, start, end):
    """Get entries within date range"""
    return [e for e in db["entries"] if start <= e["date"] <= end]

def get_all_entries(db):
    """Get all entries sorted by date"""
    return sorted(db["entries"], key=lambda e: e["date"])

def save_database(db):
    """Save database to file"""
    data = [entry_to_dict(entry) for entry in db["entries"]]
    Path(db["db_file"]).write_text(json.dumps(data, indent=2))

def load_database(db):
    """Load database from file"""
    if not Path(db["db_file"]).exists():
        db["entries"] = []
        return

    try:
        data = json.loads(Path(db["db_file"]).read_text())
        db["entries"] = [entry_from_dict(e) for e in data]
    except (json.JSONDecodeError, KeyError, ValueError):
        db["entries"] = []
```

### Weather Statistics

```python
# statistics.py
from datetime import date, timedelta
from collections import Counter

def get_summary(db, start, end):
    """Get statistical summary for date range"""
    entries = get_entries_in_range(db, start, end)

    if not entries:
        return {"error": "No data for date range"}

    temps_high = [e["temperature_high"] for e in entries]
    temps_low = [e["temperature_low"] for e in entries]
    temps_avg = [temperature_avg(e) for e in entries]
    humidity_vals = [e["humidity"] for e in entries]
    precip_vals = [e["precipitation"] for e in entries]
    wind_vals = [e["wind_speed"] for e in entries]

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

def get_monthly_averages(db, year, month):
    """Get averages for a specific month"""
    start = date(year, month, 1)

    # Calculate last day of month
    if month == 12:
        end = date(year + 1, 1, 1) - timedelta(days=1)
    else:
        end = date(year, month + 1, 1) - timedelta(days=1)

    return get_summary(db, start, end)

def get_conditions_breakdown(db, start, end):
    """Get count of each weather condition"""
    entries = get_entries_in_range(db, start, end)
    conditions = [e["conditions"].lower() for e in entries]
    return dict(Counter(conditions))

def find_extremes(db):
    """Find extreme weather records"""
    entries = get_all_entries(db)

    if not entries:
        return {"error": "No data available"}

    hottest = max(entries, key=lambda e: e["temperature_high"])
    coldest = min(entries, key=lambda e: e["temperature_low"])
    wettest = max(entries, key=lambda e: e["precipitation"])
    windiest = max(entries, key=lambda e: e["wind_speed"])
    most_humid = max(entries, key=lambda e: e["humidity"])

    return {
        "hottest_day": {
            "date": hottest["date"].isoformat(),
            "temperature": hottest["temperature_high"]
        },
        "coldest_day": {
            "date": coldest["date"].isoformat(),
            "temperature": coldest["temperature_low"]
        },
        "wettest_day": {
            "date": wettest["date"].isoformat(),
            "precipitation": wettest["precipitation"]
        },
        "windiest_day": {
            "date": windiest["date"].isoformat(),
            "wind_speed": windiest["wind_speed"]
        },
        "most_humid_day": {
            "date": most_humid["date"].isoformat(),
            "humidity": most_humid["humidity"]
        }
    }

def calculate_trends(db, days=7):
    """Calculate recent trends"""
    entries = get_all_entries(db)[-days:]

    if len(entries) < 2:
        return {"error": "Not enough data for trends"}

    # Calculate temperature trend
    temps = [temperature_avg(e) for e in entries]
    temp_trend = temps[-1] - temps[0]

    # Calculate humidity trend
    humidity = [e["humidity"] for e in entries]
    humidity_trend = humidity[-1] - humidity[0]

    # Calculate precipitation trend
    precip = [e["precipitation"] for e in entries]
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

def generate_monthly_report(db, year, month):
    """Generate monthly weather report"""
    report = []

    month_names = ["", "January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"]

    report.append("="*70)
    report.append(f"WEATHER REPORT - {month_names[month]} {year}")
    report.append("="*70)
    report.append("")

    # Get summary
    summary = get_monthly_averages(db, year, month)

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

    conditions = get_conditions_breakdown(db, start, end)

    if conditions:
        report.append("CONDITIONS")
        report.append("-"*70)
        for condition, count in sorted(conditions.items(), key=lambda x: x[1], reverse=True):
            percentage = (count / summary['date_range']['days']) * 100
            report.append(f"{condition.capitalize():<15} {count:>3} days ({percentage:>5.1f}%)")

    report.append("")
    report.append("="*70)

    return "\n".join(report)

def generate_extremes_report(db):
    """Generate report of record weather events"""
    extremes = find_extremes(db)

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

def export_to_csv(db, filename, start=None, end=None):
    """Export weather data to CSV file"""
    if start and end:
        entries = get_entries_in_range(db, start, end)
    else:
        entries = get_all_entries(db)

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
                entry["date"].isoformat(),
                entry["temperature_high"],
                entry["temperature_low"],
                temperature_avg(entry),
                entry["humidity"],
                entry["precipitation"],
                entry["wind_speed"],
                entry["conditions"],
                entry["notes"] or ''
            ])

    return len(entries)

def import_from_csv(db, filename):
    """Import weather data from CSV file"""
    imported = 0

    with open(filename, 'r') as f:
        reader = csv.DictReader(f)

        for row in reader:
            try:
                entry = create_weather_entry(
                    entry_date=date.fromisoformat(row['Date']),
                    temperature_high=float(row['High Temp']),
                    temperature_low=float(row['Low Temp']),
                    humidity=int(row['Humidity']),
                    precipitation=float(row['Precipitation']),
                    wind_speed=float(row['Wind Speed']),
                    conditions=row['Conditions'],
                    notes=row.get('Notes') or None
                )

                add_entry(db, entry)
                imported += 1

            except (ValueError, KeyError) as e:
                print(f"Skipped row: {e}")

    return imported
```

### CLI Application

```python
# cli.py
from datetime import datetime, date

def add_weather_observation(db):
    """Add new weather entry via user input"""
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
        entry = create_weather_entry(
            entry_date=entry_date,
            temperature_high=temp_high,
            temperature_low=temp_low,
            humidity=humidity,
            precipitation=precip,
            wind_speed=wind,
            conditions=conditions,
            notes=notes
        )

        add_entry(db, entry)
        print("✓ Weather entry added")

    except ValueError as e:
        print(f"✗ Error: {e}")

def run_weather_tracker():
    """Main application"""
    db = create_weather_database()

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
            add_weather_observation(db)

        elif choice == "2":
            entries = get_all_entries(db)
            if not entries:
                print("\nNo entries yet.")
            else:
                print(f"\n{'Date':<12} {'High':<6} {'Low':<6} {'Precip':<8} {'Conditions'}")
                print("-"*70)
                for e in entries[-20:]:  # Last 20
                    print(f"{e['date']} {e['temperature_high']:>5.1f}° {e['temperature_low']:>5.1f}° "
                          f"{e['precipitation']:>6.2f}\" {e['conditions']}")

        elif choice == "3":
            year = int(input("\nYear: "))
            month = int(input("Month (1-12): "))
            report = generate_monthly_report(db, year, month)
            print("\n" + report)

        elif choice == "4":
            report = generate_extremes_report(db)
            print("\n" + report)

        elif choice == "5":
            trends = calculate_trends(db, 7)
            if "error" not in trends:
                print(f"\n--- Trends (Last {trends['period_days']} days) ---")
                print(f"Temperature: {trends['temperature_trend']['direction']} ({trends['temperature_trend']['change']:+.1f}°F)")
                print(f"Humidity: {trends['humidity_trend']['direction']} ({trends['humidity_trend']['change']:+.1f}%)")
                print(f"Avg Precipitation: {trends['precipitation_avg']:.2f}\"")
            else:
                print(f"\n{trends['error']}")

        elif choice == "6":
            filename = input("\nFilename: ").strip() or "weather_export.csv"
            count = export_to_csv(db, filename)
            print(f"✓ Exported {count} entries to {filename}")

        elif choice == "7":
            filename = input("\nFilename: ").strip()
            count = import_from_csv(db, filename)
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
