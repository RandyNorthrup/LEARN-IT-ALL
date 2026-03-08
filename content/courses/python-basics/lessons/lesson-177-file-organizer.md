---
id: lesson-177-file-organizer
title: "Smart File Organizer"
chapterId: ch13-practice
order: 12
duration: 30
objectives:
  - Build automated file organizer
  - Organize by type, date, or custom rules
  - Handle duplicates and conflicts
  - Generate organization reports
---

# Smart File Organizer

Build an intelligent file organization system with automated sorting and duplicate detection.

## Project Overview

Create file organizer that:
- Automatically organizes files
- Detects duplicates
- Applies custom rules
- Handles conflicts
- Generates reports

## Data Models

```python
# models.py
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Optional, Set
import hashlib

# Organization strategy constants
STRATEGY_BY_EXTENSION = "by_extension"
STRATEGY_BY_DATE = "by_date"
STRATEGY_BY_SIZE = "by_size"
STRATEGY_BY_NAME_PREFIX = "by_name_prefix"
STRATEGY_CUSTOM_RULES = "custom_rules"

# File action constants
ACTION_MOVED = "moved"
ACTION_COPIED = "copied"
ACTION_RENAMED = "renamed"
ACTION_SKIPPED = "skipped"
ACTION_DELETED = "deleted"

# Conflict resolution constants
CONFLICT_SKIP = "skip"
CONFLICT_RENAME = "rename"
CONFLICT_REPLACE = "replace"
CONFLICT_KEEP_BOTH = "keep_both"


def create_file_info(path, name, extension, size_bytes,
                     created_time, modified_time, file_hash=None):
    """Create information record about a file"""
    return {
        "path": path,
        "name": name,
        "extension": extension,
        "size_bytes": size_bytes,
        "created_time": created_time,
        "modified_time": modified_time,
        "hash": file_hash,
    }


def file_info_from_path(file_path):
    """Create file info dict from a filesystem path"""
    stat = file_path.stat()

    return create_file_info(
        path=file_path,
        name=file_path.stem,
        extension=file_path.suffix.lower(),
        size_bytes=stat.st_size,
        created_time=datetime.fromtimestamp(stat.st_ctime),
        modified_time=datetime.fromtimestamp(stat.st_mtime),
        file_hash=None,
    )


def calculate_file_hash(file_info):
    """Calculate MD5 hash of file"""
    if file_info["hash"]:
        return file_info["hash"]

    md5 = hashlib.md5()
    with open(file_info["path"], 'rb') as f:
        for chunk in iter(lambda: f.read(8192), b''):
            md5.update(chunk)

    file_info["hash"] = md5.hexdigest()
    return file_info["hash"]


def file_size_mb(file_info):
    """Get size in MB"""
    return round(file_info["size_bytes"] / (1024 * 1024), 2)


def file_age_days(file_info):
    """Days since modification"""
    return (datetime.now() - file_info["modified_time"]).days


def create_organization_rule(name, condition, destination_folder, priority=0):
    """Create a custom organization rule"""
    return {
        "name": name,
        "condition": condition,  # Function that takes file_info and returns bool
        "destination_folder": destination_folder,
        "priority": priority,  # Higher priority rules checked first
    }


def rule_matches(rule, file_info):
    """Check if file matches rule"""
    try:
        return rule["condition"](file_info)
    except Exception:
        return False


def create_organization_result(file_info, action, source_path,
                                destination_path=None, error=None):
    """Create result of organizing a file"""
    return {
        "file_info": file_info,
        "action": action,
        "source_path": source_path,
        "destination_path": destination_path,
        "error": error,
    }


def result_was_successful(result):
    """Check if action was successful"""
    return result["error"] is None


def create_organization_report(start_time, end_time=None, total_files=0,
                                files_moved=0, files_copied=0, files_renamed=0,
                                files_skipped=0, duplicates_found=0,
                                space_saved_bytes=0, errors=None, results=None):
    """Create summary of organization session"""
    return {
        "start_time": start_time,
        "end_time": end_time or start_time,
        "total_files": total_files,
        "files_moved": files_moved,
        "files_copied": files_copied,
        "files_renamed": files_renamed,
        "files_skipped": files_skipped,
        "duplicates_found": duplicates_found,
        "space_saved_bytes": space_saved_bytes,
        "errors": errors if errors is not None else [],
        "results": results if results is not None else [],
    }


def report_duration_seconds(report):
    """Get operation duration"""
    return (report["end_time"] - report["start_time"]).total_seconds()


def report_space_saved_mb(report):
    """Get space saved in MB"""
    return round(report["space_saved_bytes"] / (1024 * 1024), 2)


def report_success_rate(report):
    """Calculate success percentage"""
    successful = sum(1 for r in report["results"] if result_was_successful(r))
    return (successful / report["total_files"] * 100) if report["total_files"] > 0 else 0
```

## File Organizer Core

```python
# file_organizer.py
import shutil
from collections import defaultdict
from typing import List, Dict, Set, Tuple

# Common file type mappings
FILE_CATEGORIES = {
    "documents": {".pdf", ".doc", ".docx", ".txt", ".rtf", ".odt"},
    "images": {".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg", ".webp"},
    "videos": {".mp4", ".avi", ".mkv", ".mov", ".wmv", ".flv", ".webm"},
    "audio": {".mp3", ".wav", ".flac", ".aac", ".ogg", ".m4a"},
    "archives": {".zip", ".rar", ".7z", ".tar", ".gz", ".bz2"},
    "code": {".py", ".js", ".java", ".cpp", ".c", ".html", ".css", ".json"},
    "spreadsheets": {".xlsx", ".xls", ".csv", ".ods"},
    "presentations": {".pptx", ".ppt", ".odp"},
}


def create_organizer(base_directory):
    """Create a file organizer state"""
    return {
        "base_directory": Path(base_directory),
        "rules": [],
        "conflict_resolution": CONFLICT_RENAME,
        "dry_run": False,  # If True, only simulate actions
    }


def add_rule(organizer, rule):
    """Add custom organization rule"""
    organizer["rules"].append(rule)
    # Sort by priority (higher first)
    organizer["rules"].sort(key=lambda r: r["priority"], reverse=True)


def scan_directory(directory, recursive=False):
    """Scan directory for files"""
    files = []
    directory = Path(directory)

    if recursive:
        for file_path in directory.rglob("*"):
            if file_path.is_file():
                files.append(file_info_from_path(file_path))
    else:
        for file_path in directory.iterdir():
            if file_path.is_file():
                files.append(file_info_from_path(file_path))

    return files


def organize_by_extension(organizer, files, target_dir):
    """Organize files by extension into categories"""
    start_time = datetime.now()
    report = create_organization_report(
        start_time=start_time,
        total_files=len(files),
    )

    for file_info in files:
        # Find category for file
        category = "other"
        for cat_name, extensions in FILE_CATEGORIES.items():
            if file_info["extension"] in extensions:
                category = cat_name
                break

        # Create destination directory
        dest_dir = target_dir / category
        dest_dir.mkdir(parents=True, exist_ok=True)

        # Move file
        result = _move_file(organizer, file_info, dest_dir)
        report["results"].append(result)

        if result_was_successful(result):
            if result["action"] == ACTION_MOVED:
                report["files_moved"] += 1
            elif result["action"] == ACTION_RENAMED:
                report["files_renamed"] += 1
            elif result["action"] == ACTION_SKIPPED:
                report["files_skipped"] += 1
        else:
            report["errors"].append(result["error"])

    report["end_time"] = datetime.now()
    return report


def organize_by_date(organizer, files, target_dir, use_created=False):
    """Organize files by date (YYYY/MM format)"""
    start_time = datetime.now()
    report = create_organization_report(
        start_time=start_time,
        total_files=len(files),
    )

    for file_info in files:
        # Choose date
        date_to_use = (file_info["created_time"] if use_created
                      else file_info["modified_time"])

        # Create directory structure: YYYY/MM
        year_folder = target_dir / str(date_to_use.year)
        month_folder = year_folder / f"{date_to_use.month:02d}"
        month_folder.mkdir(parents=True, exist_ok=True)

        # Move file
        result = _move_file(organizer, file_info, month_folder)
        report["results"].append(result)

        if result_was_successful(result):
            if result["action"] == ACTION_MOVED:
                report["files_moved"] += 1
            elif result["action"] == ACTION_RENAMED:
                report["files_renamed"] += 1
            elif result["action"] == ACTION_SKIPPED:
                report["files_skipped"] += 1
        else:
            report["errors"].append(result["error"])

    report["end_time"] = datetime.now()
    return report


def organize_by_rules(organizer, files, target_dir):
    """Organize files using custom rules"""
    start_time = datetime.now()
    report = create_organization_report(
        start_time=start_time,
        total_files=len(files),
    )

    for file_info in files:
        # Find matching rule
        matched_rule = None
        for rule in organizer["rules"]:
            if rule_matches(rule, file_info):
                matched_rule = rule
                break

        if matched_rule:
            dest_dir = target_dir / matched_rule["destination_folder"]
            dest_dir.mkdir(parents=True, exist_ok=True)

            result = _move_file(organizer, file_info, dest_dir)
            report["results"].append(result)

            if result_was_successful(result):
                if result["action"] == ACTION_MOVED:
                    report["files_moved"] += 1
                elif result["action"] == ACTION_RENAMED:
                    report["files_renamed"] += 1
        else:
            # No rule matched, skip
            result = create_organization_result(
                file_info=file_info,
                action=ACTION_SKIPPED,
                source_path=file_info["path"],
                destination_path=None,
                error="No matching rule",
            )
            report["results"].append(result)
            report["files_skipped"] += 1

    report["end_time"] = datetime.now()
    return report


def find_duplicates(files):
    """Find duplicate files by hash"""
    # Calculate hashes
    hash_map = defaultdict(list)

    for file_info in files:
        file_hash = calculate_file_hash(file_info)
        hash_map[file_hash].append(file_info)

    # Keep only duplicates
    duplicates = {h: flist for h, flist in hash_map.items() if len(flist) > 1}

    return duplicates


def remove_duplicates(organizer, files, keep_newest=True):
    """Remove duplicate files"""
    start_time = datetime.now()
    report = create_organization_report(
        start_time=start_time,
        total_files=len(files),
    )

    duplicates = find_duplicates(files)

    for file_hash, duplicate_files in duplicates.items():
        report["duplicates_found"] += len(duplicate_files) - 1

        # Sort by modification time
        sorted_files = sorted(
            duplicate_files,
            key=lambda f: f["modified_time"],
            reverse=keep_newest,
        )

        # Keep first (newest/oldest), delete rest
        delete_files = sorted_files[1:]

        for file_info in delete_files:
            try:
                if not organizer["dry_run"]:
                    file_info["path"].unlink()

                report["space_saved_bytes"] += file_info["size_bytes"]

                result = create_organization_result(
                    file_info=file_info,
                    action=ACTION_DELETED,
                    source_path=file_info["path"],
                    destination_path=None,
                )
                report["results"].append(result)

            except Exception as e:
                result = create_organization_result(
                    file_info=file_info,
                    action=ACTION_SKIPPED,
                    source_path=file_info["path"],
                    destination_path=None,
                    error=str(e),
                )
                report["results"].append(result)
                report["errors"].append(str(e))

    report["end_time"] = datetime.now()
    return report


def _move_file(organizer, file_info, dest_dir):
    """Move file to destination directory"""
    dest_path = dest_dir / file_info["path"].name

    # Handle naming conflict
    if dest_path.exists():
        if organizer["conflict_resolution"] == CONFLICT_SKIP:
            return create_organization_result(
                file_info=file_info,
                action=ACTION_SKIPPED,
                source_path=file_info["path"],
                destination_path=None,
                error="File already exists",
            )

        elif organizer["conflict_resolution"] == CONFLICT_RENAME:
            # Add number to filename
            counter = 1
            while dest_path.exists():
                new_name = f"{file_info['name']}_{counter}{file_info['extension']}"
                dest_path = dest_dir / new_name
                counter += 1

    # Perform move
    try:
        if not organizer["dry_run"]:
            shutil.move(str(file_info["path"]), str(dest_path))

        action = (ACTION_RENAMED if dest_path.name != file_info["path"].name
                 else ACTION_MOVED)

        return create_organization_result(
            file_info=file_info,
            action=action,
            source_path=file_info["path"],
            destination_path=dest_path,
        )

    except Exception as e:
        return create_organization_result(
            file_info=file_info,
            action=ACTION_SKIPPED,
            source_path=file_info["path"],
            destination_path=None,
            error=str(e),
        )
```

## Report Generator

```python
# report_generator.py

def generate_text_report(report):
    """Generate text report"""
    lines = []
    lines.append("=" * 70)
    lines.append("FILE ORGANIZATION REPORT")
    lines.append("=" * 70)
    lines.append(f"Start Time: {report['start_time'].strftime('%Y-%m-%d %H:%M:%S')}")
    lines.append(f"End Time: {report['end_time'].strftime('%Y-%m-%d %H:%M:%S')}")
    lines.append(f"Duration: {report_duration_seconds(report):.2f} seconds")
    lines.append("")

    lines.append("Summary:")
    lines.append(f"  Total Files: {report['total_files']}")
    lines.append(f"  Files Moved: {report['files_moved']}")
    lines.append(f"  Files Renamed: {report['files_renamed']}")
    lines.append(f"  Files Skipped: {report['files_skipped']}")
    lines.append(f"  Duplicates Found: {report['duplicates_found']}")
    lines.append(f"  Success Rate: {report_success_rate(report):.1f}%")

    if report["space_saved_bytes"] > 0:
        lines.append(f"  Space Saved: {report_space_saved_mb(report)} MB")

    if report["errors"]:
        lines.append("")
        lines.append(f"Errors ({len(report['errors'])}):")
        for error in report["errors"][:10]:  # Show first 10
            lines.append(f"  - {error}")

    lines.append("=" * 70)

    return "\n".join(lines)


def generate_detailed_report(report):
    """Generate detailed report with all file actions"""
    lines = [generate_text_report(report)]

    lines.append("\nDetailed Actions:")
    lines.append("-" * 70)

    for result in report["results"]:
        status = "✓" if result_was_successful(result) else "✗"

        if result["destination_path"]:
            lines.append(f"{status} {result['action']}: {result['source_path'].name}")
            lines.append(f"   → {result['destination_path']}")
        else:
            lines.append(f"{status} {result['action']}: {result['source_path'].name}")
            if result["error"]:
                lines.append(f"   Error: {result['error']}")

    return "\n".join(lines)
```

## CLI Application

```python
# cli.py

def run_file_organizer():
    """Main file organizer interface"""
    print("Smart File Organizer")
    print("=" * 70)

    source_dir = input("Source directory: ").strip()
    source_path = Path(source_dir)

    if not source_path.exists():
        print(f"Error: Directory '{source_dir}' not found")
        return

    target_dir = input("Target directory (or Enter for source): ").strip()
    target_path = Path(target_dir) if target_dir else source_path / "organized"
    target_path.mkdir(parents=True, exist_ok=True)

    organizer = create_organizer(source_path)

    print("\nOrganization Strategies:")
    print("1. By File Type (documents, images, etc.)")
    print("2. By Date (YYYY/MM)")
    print("3. Find Duplicates")
    print("4. Custom Rules")

    choice = input("\nChoice: ").strip()

    # Scan files
    print(f"\nScanning '{source_path}'...")
    recursive = input("Scan subdirectories? (y/n): ").lower() == "y"
    files = scan_directory(source_path, recursive=recursive)

    print(f"Found {len(files)} files")

    # Dry run option
    dry_run = input("Dry run (preview only)? (y/n): ").lower() == "y"
    organizer["dry_run"] = dry_run

    # Conflict resolution
    print("\nConflict Resolution:")
    print("1. Skip existing files")
    print("2. Rename duplicates")
    print("3. Replace existing")
    conflict_choice = input("Choice (default 2): ").strip() or "2"

    if conflict_choice == "1":
        organizer["conflict_resolution"] = CONFLICT_SKIP
    elif conflict_choice == "3":
        organizer["conflict_resolution"] = CONFLICT_REPLACE
    else:
        organizer["conflict_resolution"] = CONFLICT_RENAME

    # Execute organization
    print(f"\n{'[DRY RUN] ' if dry_run else ''}Organizing files...")

    report = None

    if choice == "1":
        report = organize_by_extension(organizer, files, target_path)

    elif choice == "2":
        use_created = input(
            "Use creation date? (y/n, default modified): "
        ).lower() == "y"
        report = organize_by_date(organizer, files, target_path, use_created)

    elif choice == "3":
        print("\nFinding duplicates...")
        duplicates = find_duplicates(files)

        if duplicates:
            print(f"\nFound {len(duplicates)} sets of duplicates:")
            total_dupes = sum(len(flist) - 1 for flist in duplicates.values())
            total_size = sum(
                sum(f["size_bytes"] for f in flist[1:])
                for flist in duplicates.values()
            )

            print(f"  Duplicate files: {total_dupes}")
            print(f"  Wasted space: {total_size / (1024*1024):.2f} MB")

            if input("\nRemove duplicates? (y/n): ").lower() == "y":
                keep_newest = input(
                    "Keep newest files? (y/n, default yes): "
                ).lower() != "n"
                report = remove_duplicates(organizer, files, keep_newest)
        else:
            print("No duplicates found!")

    elif choice == "4":
        # Example custom rules
        print("\nExample rules:")
        print("1. Large files (>10MB) → 'large_files'")
        print("2. Old files (>365 days) → 'archive'")
        print("3. Screenshots → 'screenshots'")

        rule_choice = input("Select rule: ").strip()

        if rule_choice == "1":
            add_rule(organizer, create_organization_rule(
                name="Large Files",
                condition=lambda f: f["size_bytes"] > 10 * 1024 * 1024,
                destination_folder="large_files",
                priority=1,
            ))
        elif rule_choice == "2":
            add_rule(organizer, create_organization_rule(
                name="Old Files",
                condition=lambda f: file_age_days(f) > 365,
                destination_folder="archive",
                priority=1,
            ))
        elif rule_choice == "3":
            add_rule(organizer, create_organization_rule(
                name="Screenshots",
                condition=lambda f: "screenshot" in f["name"].lower(),
                destination_folder="screenshots",
                priority=2,
            ))

        report = organize_by_rules(organizer, files, target_path)

    # Show report
    if report:
        print("\n" + generate_text_report(report))

        if input("\nSave detailed report? (y/n): ").lower() == "y":
            report_text = generate_detailed_report(report)
            report_file = Path("organization_report.txt")
            report_file.write_text(report_text)
            print(f"Report saved to: {report_file}")

if __name__ == "__main__":
    run_file_organizer()
```

## Summary

Built smart file organizer with:
- Multiple organization strategies
- Duplicate detection and removal
- Custom rule system
- Conflict resolution
- Dry run mode
- Detailed reporting

**Skills Applied:**
- File system operations
- Hashing (MD5)
- Complex algorithms
- Pattern matching
- Error handling
- Report generation
