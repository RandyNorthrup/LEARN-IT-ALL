---
id: "151-error-handling-file-io"
title: "Error Handling in File Operations"
chapterId: ch11-error-handling
order: 7
duration: 25
objectives:
  - Handle file operation errors
  - Manage file permissions issues
  - Work with file paths safely
  - Implement robust file processing
---

# Error Handling in File Operations

File operations are prone to errors - learn to handle them gracefully.

## Common File Exceptions

```python
# FileNotFoundError - file doesn't exist
try:
    with open("missing.txt", "r") as f:
        content = f.read()
except FileNotFoundError:
    print("File not found")

# PermissionError - insufficient permissions
try:
    with open("/etc/passwd", "w") as f:
        f.write("malicious")
except PermissionError:
    print("Permission denied")

# IsADirectoryError - expected file, got directory
try:
    with open("/tmp", "r") as f:
        content = f.read()
except IsADirectoryError:
    print("Expected file, got directory")

# FileExistsError - file already exists (with 'x' mode)
try:
    with open("existing.txt", "x") as f:
        f.write("new file")
except FileExistsError:
    print("File already exists")

# OSError - general OS-level error
try:
    with open("problematic.txt") as f:
        content = f.read()
except OSError as e:
    print(f"OS error: {e}")
```

## Safe File Reading

```python
# Basic safe file reading
def read_file_safe(filename):
    """Safely read file with error handling"""
    try:
        with open(filename, 'r') as f:
            return f.read()
    except FileNotFoundError:
        print(f"File not found: {filename}")
        return None
    except PermissionError:
        print(f"Permission denied: {filename}")
        return None
    except Exception as e:
        print(f"Error reading {filename}: {e}")
        return None

# Read with default content
def read_file_or_default(filename, default=""):
    """Read file or return default"""
    try:
        with open(filename, 'r') as f:
            return f.read()
    except FileNotFoundError:
        return default
    except Exception as e:
        print(f"Error: {e}")
        return default

# Read with multiple encodings
def read_file_flexible(filename):
    """Try multiple encodings"""
    encodings = ['utf-8', 'latin-1', 'cp1252']
    
    for encoding in encodings:
        try:
            with open(filename, 'r', encoding=encoding) as f:
                content = f.read()
                print(f"Success with {encoding}")
                return content
        except UnicodeDecodeError:
            print(f"Failed with {encoding}")
            continue
        except FileNotFoundError:
            return None
    
    print("All encodings failed")
    return None

# Read with line-by-line error handling
def read_file_skip_bad_lines(filename):
    """Read file, skip lines that cause errors"""
    lines = []
    errors = []
    
    try:
        with open(filename, 'r') as f:
            for line_num, line in enumerate(f, 1):
                try:
                    # Process line (might fail)
                    processed = line.strip()
                    if processed:
                        lines.append(processed)
                except Exception as e:
                    errors.append((line_num, str(e)))
    except FileNotFoundError:
        return None, [("file", "File not found")]
    
    return lines, errors
```

## Safe File Writing

```python
# Basic safe file writing
def write_file_safe(filename, content):
    """Safely write to file"""
    try:
        with open(filename, 'w') as f:
            f.write(content)
        return True
    except PermissionError:
        print(f"Cannot write to {filename}: Permission denied")
        return False
    except OSError as e:
        print(f"Error writing to {filename}: {e}")
        return False

# Write with backup
def write_file_with_backup(filename, content):
    """Write file, creating backup of original"""
    import shutil
    
    backup_name = f"{filename}.backup"
    
    try:
        # Create backup if file exists
        try:
            shutil.copy2(filename, backup_name)
            print(f"Backup created: {backup_name}")
        except FileNotFoundError:
            pass  # No existing file to backup
        
        # Write new content
        with open(filename, 'w') as f:
            f.write(content)
        
        return True
    
    except Exception as e:
        print(f"Error: {e}")
        
        # Try to restore backup
        try:
            if os.path.exists(backup_name):
                shutil.move(backup_name, filename)
                print("Restored from backup")
        except:
            pass
        
        return False

# Atomic write (write to temp, then rename)
def write_file_atomic(filename, content):
    """Write atomically using temp file"""
    import tempfile
    import os
    
    # Get directory and basename
    directory = os.path.dirname(filename) or '.'
    basename = os.path.basename(filename)
    
    try:
        # Write to temporary file in same directory
        with tempfile.NamedTemporaryFile(
            mode='w',
            dir=directory,
            delete=False,
            prefix=f'.{basename}.',
            suffix='.tmp'
        ) as tmp:
            tmp.write(content)
            tmp_name = tmp.name
        
        # Atomic rename
        os.replace(tmp_name, filename)
        return True
    
    except Exception as e:
        print(f"Error: {e}")
        
        # Clean up temp file
        try:
            if 'tmp_name' in locals():
                os.unlink(tmp_name)
        except:
            pass
        
        return False

# Write with disk space check
def write_file_check_space(filename, content):
    """Write file after checking disk space"""
    import shutil
    
    try:
        # Check available space
        stats = shutil.disk_usage(os.path.dirname(filename) or '.')
        required = len(content.encode('utf-8'))
        
        if stats.free < required * 2:  # Need 2x for safety
            print(f"Insufficient disk space: need {required}, have {stats.free}")
            return False
        
        # Write file
        with open(filename, 'w') as f:
            f.write(content)
        
        return True
    
    except Exception as e:
        print(f"Error: {e}")
        return False
```

## Path Validation

```python
import os

# Validate path exists
def validate_path(path):
    """Validate path with detailed checks"""
    if not path:
        raise ValueError("Path cannot be empty")
    
    if not os.path.exists(path):
        raise FileNotFoundError(f"Path does not exist: {path}")
    
    if not os.path.isfile(path):
        raise IsADirectoryError(f"Path is not a file: {path}")
    
    if not os.access(path, os.R_OK):
        raise PermissionError(f"File not readable: {path}")
    
    return True

# Safe path operations
def safe_path_join(*parts):
    """Safely join path parts"""
    try:
        path = os.path.join(*parts)
        
        # Prevent directory traversal
        abs_path = os.path.abspath(path)
        base_dir = os.path.abspath(parts[0])
        
        if not abs_path.startswith(base_dir):
            raise ValueError("Path traversal detected")
        
        return abs_path
    
    except Exception as e:
        print(f"Error joining path: {e}")
        return None

# Check file is within allowed directory
def is_safe_path(filename, base_directory):
    """Check if file path is within base directory"""
    try:
        abs_filename = os.path.abspath(filename)
        abs_base = os.path.abspath(base_directory)
        
        # Check if file is within base directory
        return abs_filename.startswith(abs_base)
    
    except Exception as e:
        print(f"Error checking path: {e}")
        return False

# Create directory safely
def create_directory_safe(path):
    """Safely create directory"""
    try:
        os.makedirs(path, exist_ok=True)
        return True
    except PermissionError:
        print(f"Permission denied: {path}")
        return False
    except OSError as e:
        print(f"Error creating directory: {e}")
        return False
```

## File Processing with Error Recovery

```python
# Process file with line-level error handling
def process_csv_robust(filename):
    """Process CSV with error handling per line"""
    import csv
    
    results = []
    errors = []
    
    try:
        with open(filename, 'r') as f:
            reader = csv.DictReader(f)
            
            for line_num, row in enumerate(reader, 2):  # Start at 2 (after header)
                try:
                    # Process row
                    processed = {
                        'name': row['name'].strip(),
                        'age': int(row['age']),
                        'email': row['email'].lower()
                    }
                    results.append(processed)
                
                except KeyError as e:
                    errors.append((line_num, f"Missing column: {e}"))
                except ValueError as e:
                    errors.append((line_num, f"Invalid value: {e}"))
                except Exception as e:
                    errors.append((line_num, f"Error: {e}"))
    
    except FileNotFoundError:
        print(f"File not found: {filename}")
        return None, None
    except Exception as e:
        print(f"Error opening file: {e}")
        return None, None
    
    return results, errors

# Process multiple files with continuation
def process_multiple_files(filenames):
    """Process multiple files, continue on errors"""
    results = {}
    errors = {}
    
    for filename in filenames:
        try:
            with open(filename, 'r') as f:
                content = f.read()
                results[filename] = content
        
        except Exception as e:
            errors[filename] = str(e)
            continue  # Continue to next file
    
    return results, errors

# Process file with retry on temporary failures
import time

def process_file_with_retry(filename, max_retries=3):
    """Process file with retry logic"""
    for attempt in range(1, max_retries + 1):
        try:
            with open(filename, 'r') as f:
                content = f.read()
            
            # Process content
            result = content.upper()
            return result
        
        except PermissionError:
            # Don't retry permission errors
            print("Permission denied")
            return None
        
        except OSError as e:
            if attempt == max_retries:
                print(f"Failed after {max_retries} attempts")
                return None
            
            print(f"Attempt {attempt} failed: {e}")
            time.sleep(1 * attempt)  # Exponential backoff
    
    return None
```

## JSON File Handling

```python
import json

# Safe JSON reading
def read_json_safe(filename):
    """Safely read JSON file"""
    try:
        with open(filename, 'r') as f:
            data = json.load(f)
        return data, None
    
    except FileNotFoundError:
        return None, "File not found"
    
    except json.JSONDecodeError as e:
        return None, f"Invalid JSON: {e}"
    
    except Exception as e:
        return None, f"Error: {e}"

# Safe JSON writing
def write_json_safe(filename, data):
    """Safely write JSON file"""
    try:
        # Validate data is JSON-serializable
        json_str = json.dumps(data)
        
        # Write to file
        with open(filename, 'w') as f:
            f.write(json_str)
        
        return True, None
    
    except TypeError as e:
        return False, f"Data not JSON-serializable: {e}"
    
    except OSError as e:
        return False, f"Error writing file: {e}"

# Update JSON file safely
def update_json_safe(filename, updates):
    """Update JSON file with error handling"""
    try:
        # Read existing data
        try:
            with open(filename, 'r') as f:
                data = json.load(f)
        except FileNotFoundError:
            data = {}
        
        # Update data
        data.update(updates)
        
        # Write back
        with open(filename, 'w') as f:
            json.dump(data, f, indent=2)
        
        return True
    
    except json.JSONDecodeError:
        print("Existing file has invalid JSON")
        return False
    
    except Exception as e:
        print(f"Error: {e}")
        return False
```

## Binary File Handling

```python
# Safe binary file reading
def read_binary_safe(filename):
    """Safely read binary file"""
    try:
        with open(filename, 'rb') as f:
            data = f.read()
        return data
    
    except FileNotFoundError:
        print(f"File not found: {filename}")
        return None
    
    except OSError as e:
        print(f"Error reading file: {e}")
        return None

# Read large binary file in chunks
def read_binary_chunked(filename, chunk_size=8192):
    """Read large binary file in chunks"""
    chunks = []
    
    try:
        with open(filename, 'rb') as f:
            while True:
                chunk = f.read(chunk_size)
                if not chunk:
                    break
                chunks.append(chunk)
        
        return b''.join(chunks)
    
    except Exception as e:
        print(f"Error: {e}")
        return None

# Safe binary file writing
def write_binary_safe(filename, data):
    """Safely write binary file"""
    try:
        with open(filename, 'wb') as f:
            f.write(data)
        return True
    
    except Exception as e:
        print(f"Error writing {filename}: {e}")
        return False
```

## File Locking for Concurrent Access

```python
import fcntl

# File locking (Unix/Linux)
def read_with_lock(filename):
    """Read file with lock"""
    try:
        with open(filename, 'r') as f:
            # Acquire shared lock
            fcntl.flock(f.fileno(), fcntl.LOCK_SH)
            
            try:
                content = f.read()
                return content
            finally:
                # Release lock
                fcntl.flock(f.fileno(), fcntl.LOCK_UN)
    
    except Exception as e:
        print(f"Error: {e}")
        return None

# Write with exclusive lock
def write_with_lock(filename, content):
    """Write file with exclusive lock"""
    try:
        with open(filename, 'w') as f:
            # Acquire exclusive lock
            fcntl.flock(f.fileno(), fcntl.LOCK_EX)
            
            try:
                f.write(content)
                return True
            finally:
                # Release lock
                fcntl.flock(f.fileno(), fcntl.LOCK_UN)
    
    except Exception as e:
        print(f"Error: {e}")
        return False
```

## Complete File Operation Class

```python
class SafeFileManager:
    """Complete file manager with error handling"""
    
    def __init__(self, base_directory='.'):
        self.base_directory = os.path.abspath(base_directory)
    
    def _validate_path(self, filename):
        """Validate file path"""
        abs_path = os.path.abspath(filename)
        if not abs_path.startswith(self.base_directory):
            raise ValueError("Path outside base directory")
        return abs_path
    
    def read(self, filename, encoding='utf-8'):
        """Safely read file"""
        try:
            path = self._validate_path(filename)
            with open(path, 'r', encoding=encoding) as f:
                return f.read(), None
        except Exception as e:
            return None, str(e)
    
    def write(self, filename, content, encoding='utf-8'):
        """Safely write file"""
        try:
            path = self._validate_path(filename)
            
            # Create directory if needed
            os.makedirs(os.path.dirname(path), exist_ok=True)
            
            # Write atomically
            with tempfile.NamedTemporaryFile(
                mode='w',
                encoding=encoding,
                dir=os.path.dirname(path),
                delete=False
            ) as tmp:
                tmp.write(content)
                tmp_name = tmp.name
            
            os.replace(tmp_name, path)
            return True, None
        
        except Exception as e:
            return False, str(e)
    
    def exists(self, filename):
        """Check if file exists"""
        try:
            path = self._validate_path(filename)
            return os.path.isfile(path)
        except:
            return False
    
    def delete(self, filename):
        """Safely delete file"""
        try:
            path = self._validate_path(filename)
            os.remove(path)
            return True, None
        except FileNotFoundError:
            return False, "File not found"
        except Exception as e:
            return False, str(e)

# Usage
import tempfile
manager = SafeFileManager()
success, error = manager.write("test.txt", "Hello, World!")
if success:
    content, error = manager.read("test.txt")
    print(content)
```

## Summary

**File Operation Errors:**
- FileNotFoundError, PermissionError, IsADirectoryError
- OSError for general OS errors
- UnicodeDecodeError for encoding issues
- json.JSONDecodeError for invalid JSON

**Safe Practices:**
- Always use context managers (`with` statement)
- Handle specific exceptions
- Validate paths to prevent traversal
- Use atomic operations for critical files
- Create backups before modifying
- Check disk space before writing

**Advanced Techniques:**
- Try multiple encodings
- Process line-by-line with error tracking
- Implement retry logic for transient failures
- Use file locking for concurrent access
- Write atomically with temp files

**Best Practices:**
- Never assume files exist
- Check permissions before operations
- Provide helpful error messages
- Clean up temporary files
- Log all file operation errors
- Use absolute paths internally
