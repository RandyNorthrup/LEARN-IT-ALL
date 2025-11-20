---
id: "176-file-organizer"
title: "Smart File Organizer"
chapterId: ch13-practice
order: 13
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
from dataclasses import dataclass, field
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Optional, Set
from enum import Enum
import hashlib

class OrganizationStrategy(Enum):
    """File organization strategies"""
    BY_EXTENSION = "by_extension"
    BY_DATE = "by_date"
    BY_SIZE = "by_size"
    BY_NAME_PREFIX = "by_name_prefix"
    CUSTOM_RULES = "custom_rules"

class FileAction(Enum):
    """Actions taken on files"""
    MOVED = "moved"
    COPIED = "copied"
    RENAMED = "renamed"
    SKIPPED = "skipped"
    DELETED = "deleted"

class ConflictResolution(Enum):
    """How to handle naming conflicts"""
    SKIP = "skip"
    RENAME = "rename"
    REPLACE = "replace"
    KEEP_BOTH = "keep_both"

@dataclass
class FileInfo:
    """Information about a file"""
    path: Path
    name: str
    extension: str
    size_bytes: int
    created_time: datetime
    modified_time: datetime
    hash: Optional[str] = None
    
    @staticmethod
    def from_path(file_path: Path) -> 'FileInfo':
        """Create FileInfo from path"""
        stat = file_path.stat()
        
        return FileInfo(
            path=file_path,
            name=file_path.stem,
            extension=file_path.suffix.lower(),
            size_bytes=stat.st_size,
            created_time=datetime.fromtimestamp(stat.st_ctime),
            modified_time=datetime.fromtimestamp(stat.st_mtime),
            hash=None
        )
    
    def calculate_hash(self) -> str:
        """Calculate MD5 hash of file"""
        if self.hash:
            return self.hash
        
        md5 = hashlib.md5()
        with open(self.path, 'rb') as f:
            for chunk in iter(lambda: f.read(8192), b''):
                md5.update(chunk)
        
        self.hash = md5.hexdigest()
        return self.hash
    
    def size_mb(self) -> float:
        """Get size in MB"""
        return round(self.size_bytes / (1024 * 1024), 2)
    
    def age_days(self) -> int:
        """Days since modification"""
        return (datetime.now() - self.modified_time).days

@dataclass
class OrganizationRule:
    """Custom organization rule"""
    name: str
    condition: callable  # Function that takes FileInfo and returns bool
    destination_folder: str
    priority: int = 0  # Higher priority rules checked first
    
    def matches(self, file_info: FileInfo) -> bool:
        """Check if file matches rule"""
        try:
            return self.condition(file_info)
        except Exception:
            return False

@dataclass
class OrganizationResult:
    """Result of organizing a file"""
    file_info: FileInfo
    action: FileAction
    source_path: Path
    destination_path: Optional[Path]
    error: Optional[str] = None
    
    def was_successful(self) -> bool:
        """Check if action was successful"""
        return self.error is None

@dataclass
class OrganizationReport:
    """Summary of organization session"""
    start_time: datetime
    end_time: datetime
    total_files: int
    files_moved: int
    files_copied: int
    files_renamed: int
    files_skipped: int
    duplicates_found: int
    space_saved_bytes: int
    errors: List[str] = field(default_factory=list)
    results: List[OrganizationResult] = field(default_factory=list)
    
    def duration_seconds(self) -> float:
        """Get operation duration"""
        return (self.end_time - self.start_time).total_seconds()
    
    def space_saved_mb(self) -> float:
        """Get space saved in MB"""
        return round(self.space_saved_bytes / (1024 * 1024), 2)
    
    def success_rate(self) -> float:
        """Calculate success percentage"""
        successful = sum(1 for r in self.results if r.was_successful())
        return (successful / self.total_files * 100) if self.total_files > 0 else 0
```

## File Organizer Core

```python
# file_organizer.py
import shutil
from collections import defaultdict
from typing import List, Dict, Set, Tuple

class FileOrganizer:
    """Smart file organization system"""
    
    # Common file type mappings
    FILE_CATEGORIES = {
        "documents": {".pdf", ".doc", ".docx", ".txt", ".rtf", ".odt"},
        "images": {".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg", ".webp"},
        "videos": {".mp4", ".avi", ".mkv", ".mov", ".wmv", ".flv", ".webm"},
        "audio": {".mp3", ".wav", ".flac", ".aac", ".ogg", ".m4a"},
        "archives": {".zip", ".rar", ".7z", ".tar", ".gz", ".bz2"},
        "code": {".py", ".js", ".java", ".cpp", ".c", ".html", ".css", ".json"},
        "spreadsheets": {".xlsx", ".xls", ".csv", ".ods"},
        "presentations": {".pptx", ".ppt", ".odp"}
    }
    
    def __init__(self, base_directory: Path):
        self.base_directory = Path(base_directory)
        self.rules: List[OrganizationRule] = []
        self.conflict_resolution = ConflictResolution.RENAME
        self.dry_run = False  # If True, only simulate actions
    
    def add_rule(self, rule: OrganizationRule):
        """Add custom organization rule"""
        self.rules.append(rule)
        # Sort by priority (higher first)
        self.rules.sort(key=lambda r: r.priority, reverse=True)
    
    def scan_directory(self, directory: Path, recursive: bool = False) -> List[FileInfo]:
        """Scan directory for files"""
        files = []
        
        if recursive:
            for file_path in directory.rglob("*"):
                if file_path.is_file():
                    files.append(FileInfo.from_path(file_path))
        else:
            for file_path in directory.iterdir():
                if file_path.is_file():
                    files.append(FileInfo.from_path(file_path))
        
        return files
    
    def organize_by_extension(self, files: List[FileInfo], 
                             target_dir: Path) -> OrganizationReport:
        """Organize files by extension into categories"""
        start_time = datetime.now()
        report = OrganizationReport(
            start_time=start_time,
            end_time=start_time,  # Will update at end
            total_files=len(files),
            files_moved=0,
            files_copied=0,
            files_renamed=0,
            files_skipped=0,
            duplicates_found=0,
            space_saved_bytes=0
        )
        
        for file_info in files:
            # Find category for file
            category = "other"
            for cat_name, extensions in self.FILE_CATEGORIES.items():
                if file_info.extension in extensions:
                    category = cat_name
                    break
            
            # Create destination directory
            dest_dir = target_dir / category
            dest_dir.mkdir(parents=True, exist_ok=True)
            
            # Move file
            result = self._move_file(file_info, dest_dir)
            report.results.append(result)
            
            if result.was_successful():
                if result.action == FileAction.MOVED:
                    report.files_moved += 1
                elif result.action == FileAction.RENAMED:
                    report.files_renamed += 1
                elif result.action == FileAction.SKIPPED:
                    report.files_skipped += 1
            else:
                report.errors.append(result.error)
        
        report.end_time = datetime.now()
        return report
    
    def organize_by_date(self, files: List[FileInfo], 
                        target_dir: Path, use_created: bool = False) -> OrganizationReport:
        """Organize files by date (YYYY/MM format)"""
        start_time = datetime.now()
        report = OrganizationReport(
            start_time=start_time,
            end_time=start_time,
            total_files=len(files),
            files_moved=0,
            files_copied=0,
            files_renamed=0,
            files_skipped=0,
            duplicates_found=0,
            space_saved_bytes=0
        )
        
        for file_info in files:
            # Choose date
            date_to_use = file_info.created_time if use_created else file_info.modified_time
            
            # Create directory structure: YYYY/MM
            year_folder = target_dir / str(date_to_use.year)
            month_folder = year_folder / f"{date_to_use.month:02d}"
            month_folder.mkdir(parents=True, exist_ok=True)
            
            # Move file
            result = self._move_file(file_info, month_folder)
            report.results.append(result)
            
            if result.was_successful():
                if result.action == FileAction.MOVED:
                    report.files_moved += 1
                elif result.action == FileAction.RENAMED:
                    report.files_renamed += 1
                elif result.action == FileAction.SKIPPED:
                    report.files_skipped += 1
            else:
                report.errors.append(result.error)
        
        report.end_time = datetime.now()
        return report
    
    def organize_by_rules(self, files: List[FileInfo], 
                         target_dir: Path) -> OrganizationReport:
        """Organize files using custom rules"""
        start_time = datetime.now()
        report = OrganizationReport(
            start_time=start_time,
            end_time=start_time,
            total_files=len(files),
            files_moved=0,
            files_copied=0,
            files_renamed=0,
            files_skipped=0,
            duplicates_found=0,
            space_saved_bytes=0
        )
        
        for file_info in files:
            # Find matching rule
            matched_rule = None
            for rule in self.rules:
                if rule.matches(file_info):
                    matched_rule = rule
                    break
            
            if matched_rule:
                dest_dir = target_dir / matched_rule.destination_folder
                dest_dir.mkdir(parents=True, exist_ok=True)
                
                result = self._move_file(file_info, dest_dir)
                report.results.append(result)
                
                if result.was_successful():
                    if result.action == FileAction.MOVED:
                        report.files_moved += 1
                    elif result.action == FileAction.RENAMED:
                        report.files_renamed += 1
            else:
                # No rule matched, skip
                result = OrganizationResult(
                    file_info=file_info,
                    action=FileAction.SKIPPED,
                    source_path=file_info.path,
                    destination_path=None,
                    error="No matching rule"
                )
                report.results.append(result)
                report.files_skipped += 1
        
        report.end_time = datetime.now()
        return report
    
    def find_duplicates(self, files: List[FileInfo]) -> Dict[str, List[FileInfo]]:
        """Find duplicate files by hash"""
        # Calculate hashes
        hash_map = defaultdict(list)
        
        for file_info in files:
            file_hash = file_info.calculate_hash()
            hash_map[file_hash].append(file_info)
        
        # Keep only duplicates
        duplicates = {h: files for h, files in hash_map.items() if len(files) > 1}
        
        return duplicates
    
    def remove_duplicates(self, files: List[FileInfo], 
                         keep_newest: bool = True) -> OrganizationReport:
        """Remove duplicate files"""
        start_time = datetime.now()
        report = OrganizationReport(
            start_time=start_time,
            end_time=start_time,
            total_files=len(files),
            files_moved=0,
            files_copied=0,
            files_renamed=0,
            files_skipped=0,
            duplicates_found=0,
            space_saved_bytes=0
        )
        
        duplicates = self.find_duplicates(files)
        
        for file_hash, duplicate_files in duplicates.items():
            report.duplicates_found += len(duplicate_files) - 1
            
            # Sort by modification time
            sorted_files = sorted(duplicate_files, 
                                key=lambda f: f.modified_time, 
                                reverse=keep_newest)
            
            # Keep first (newest/oldest), delete rest
            keep_file = sorted_files[0]
            delete_files = sorted_files[1:]
            
            for file_info in delete_files:
                try:
                    if not self.dry_run:
                        file_info.path.unlink()
                    
                    report.space_saved_bytes += file_info.size_bytes
                    
                    result = OrganizationResult(
                        file_info=file_info,
                        action=FileAction.DELETED,
                        source_path=file_info.path,
                        destination_path=None
                    )
                    report.results.append(result)
                
                except Exception as e:
                    result = OrganizationResult(
                        file_info=file_info,
                        action=FileAction.SKIPPED,
                        source_path=file_info.path,
                        destination_path=None,
                        error=str(e)
                    )
                    report.results.append(result)
                    report.errors.append(str(e))
        
        report.end_time = datetime.now()
        return report
    
    def _move_file(self, file_info: FileInfo, dest_dir: Path) -> OrganizationResult:
        """Move file to destination directory"""
        dest_path = dest_dir / file_info.path.name
        
        # Handle naming conflict
        if dest_path.exists():
            if self.conflict_resolution == ConflictResolution.SKIP:
                return OrganizationResult(
                    file_info=file_info,
                    action=FileAction.SKIPPED,
                    source_path=file_info.path,
                    destination_path=None,
                    error="File already exists"
                )
            
            elif self.conflict_resolution == ConflictResolution.RENAME:
                # Add number to filename
                counter = 1
                while dest_path.exists():
                    new_name = f"{file_info.name}_{counter}{file_info.extension}"
                    dest_path = dest_dir / new_name
                    counter += 1
        
        # Perform move
        try:
            if not self.dry_run:
                shutil.move(str(file_info.path), str(dest_path))
            
            action = FileAction.RENAMED if dest_path.name != file_info.path.name else FileAction.MOVED
            
            return OrganizationResult(
                file_info=file_info,
                action=action,
                source_path=file_info.path,
                destination_path=dest_path
            )
        
        except Exception as e:
            return OrganizationResult(
                file_info=file_info,
                action=FileAction.SKIPPED,
                source_path=file_info.path,
                destination_path=None,
                error=str(e)
            )
```

## Report Generator

```python
# report_generator.py

class OrganizationReportGenerator:
    """Generate organization reports"""
    
    @staticmethod
    def generate_text_report(report: OrganizationReport) -> str:
        """Generate text report"""
        lines = []
        lines.append("=" * 70)
        lines.append("FILE ORGANIZATION REPORT")
        lines.append("=" * 70)
        lines.append(f"Start Time: {report.start_time.strftime('%Y-%m-%d %H:%M:%S')}")
        lines.append(f"End Time: {report.end_time.strftime('%Y-%m-%d %H:%M:%S')}")
        lines.append(f"Duration: {report.duration_seconds():.2f} seconds")
        lines.append("")
        
        lines.append("Summary:")
        lines.append(f"  Total Files: {report.total_files}")
        lines.append(f"  Files Moved: {report.files_moved}")
        lines.append(f"  Files Renamed: {report.files_renamed}")
        lines.append(f"  Files Skipped: {report.files_skipped}")
        lines.append(f"  Duplicates Found: {report.duplicates_found}")
        lines.append(f"  Success Rate: {report.success_rate():.1f}%")
        
        if report.space_saved_bytes > 0:
            lines.append(f"  Space Saved: {report.space_saved_mb()} MB")
        
        if report.errors:
            lines.append("")
            lines.append(f"Errors ({len(report.errors)}):")
            for error in report.errors[:10]:  # Show first 10
                lines.append(f"  - {error}")
        
        lines.append("=" * 70)
        
        return "\n".join(lines)
    
    @staticmethod
    def generate_detailed_report(report: OrganizationReport) -> str:
        """Generate detailed report with all file actions"""
        lines = [OrganizationReportGenerator.generate_text_report(report)]
        
        lines.append("\nDetailed Actions:")
        lines.append("-" * 70)
        
        for result in report.results:
            status = "✓" if result.was_successful() else "✗"
            
            if result.destination_path:
                lines.append(f"{status} {result.action.value}: {result.source_path.name}")
                lines.append(f"   → {result.destination_path}")
            else:
                lines.append(f"{status} {result.action.value}: {result.source_path.name}")
                if result.error:
                    lines.append(f"   Error: {result.error}")
        
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
    
    organizer = FileOrganizer(source_path)
    
    print("\nOrganization Strategies:")
    print("1. By File Type (documents, images, etc.)")
    print("2. By Date (YYYY/MM)")
    print("3. Find Duplicates")
    print("4. Custom Rules")
    
    choice = input("\nChoice: ").strip()
    
    # Scan files
    print(f"\nScanning '{source_path}'...")
    recursive = input("Scan subdirectories? (y/n): ").lower() == "y"
    files = organizer.scan_directory(source_path, recursive=recursive)
    
    print(f"Found {len(files)} files")
    
    # Dry run option
    dry_run = input("Dry run (preview only)? (y/n): ").lower() == "y"
    organizer.dry_run = dry_run
    
    # Conflict resolution
    print("\nConflict Resolution:")
    print("1. Skip existing files")
    print("2. Rename duplicates")
    print("3. Replace existing")
    conflict_choice = input("Choice (default 2): ").strip() or "2"
    
    if conflict_choice == "1":
        organizer.conflict_resolution = ConflictResolution.SKIP
    elif conflict_choice == "3":
        organizer.conflict_resolution = ConflictResolution.REPLACE
    else:
        organizer.conflict_resolution = ConflictResolution.RENAME
    
    # Execute organization
    print(f"\n{'[DRY RUN] ' if dry_run else ''}Organizing files...")
    
    report = None
    
    if choice == "1":
        report = organizer.organize_by_extension(files, target_path)
    
    elif choice == "2":
        use_created = input("Use creation date? (y/n, default modified): ").lower() == "y"
        report = organizer.organize_by_date(files, target_path, use_created)
    
    elif choice == "3":
        print("\nFinding duplicates...")
        duplicates = organizer.find_duplicates(files)
        
        if duplicates:
            print(f"\nFound {len(duplicates)} sets of duplicates:")
            total_dupes = sum(len(files) - 1 for files in duplicates.values())
            total_size = sum(
                sum(f.size_bytes for f in files[1:])
                for files in duplicates.values()
            )
            
            print(f"  Duplicate files: {total_dupes}")
            print(f"  Wasted space: {total_size / (1024*1024):.2f} MB")
            
            if input("\nRemove duplicates? (y/n): ").lower() == "y":
                keep_newest = input("Keep newest files? (y/n, default yes): ").lower() != "n"
                report = organizer.remove_duplicates(files, keep_newest)
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
            organizer.add_rule(OrganizationRule(
                name="Large Files",
                condition=lambda f: f.size_bytes > 10 * 1024 * 1024,
                destination_folder="large_files",
                priority=1
            ))
        elif rule_choice == "2":
            organizer.add_rule(OrganizationRule(
                name="Old Files",
                condition=lambda f: f.age_days() > 365,
                destination_folder="archive",
                priority=1
            ))
        elif rule_choice == "3":
            organizer.add_rule(OrganizationRule(
                name="Screenshots",
                condition=lambda f: "screenshot" in f.name.lower(),
                destination_folder="screenshots",
                priority=2
            ))
        
        report = organizer.organize_by_rules(files, target_path)
    
    # Show report
    if report:
        print("\n" + OrganizationReportGenerator.generate_text_report(report))
        
        if input("\nSave detailed report? (y/n): ").lower() == "y":
            report_text = OrganizationReportGenerator.generate_detailed_report(report)
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
