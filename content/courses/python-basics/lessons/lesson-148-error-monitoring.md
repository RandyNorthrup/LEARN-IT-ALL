---
id: "156-error-monitoring"
title: "Error Monitoring and Tracking"
chapterId: ch11-error-handling
order: 11
duration: 25
objectives:
  - Track error rates and patterns
  - Implement error reporting
  - Monitor production errors
  - Create error dashboards
---

# Error Monitoring and Tracking

Production systems need comprehensive error monitoring.

## Error Counter

```python
from collections import defaultdict
from datetime import datetime
from typing import Dict, List

class ErrorCounter:
    """Count errors by type"""
    
    def __init__(self):
        self.counts: Dict[str, int] = defaultdict(int)
        self.total = 0
    
    def record(self, error_type: str):
        """Record an error"""
        self.counts[error_type] += 1
        self.total += 1
    
    def get_counts(self) -> Dict[str, int]:
        """Get error counts"""
        return dict(self.counts)
    
    def get_total(self) -> int:
        """Get total errors"""
        return self.total
    
    def get_top_errors(self, n: int = 5) -> List[tuple]:
        """Get top N error types"""
        sorted_errors = sorted(
            self.counts.items(),
            key=lambda x: x[1],
            reverse=True
        )
        return sorted_errors[:n]

# Usage
counter = ErrorCounter()

try:
    result = 10 / 0
except ZeroDivisionError as e:
    counter.record("ZeroDivisionError")

try:
    int("invalid")
except ValueError as e:
    counter.record("ValueError")

try:
    [][10]
except IndexError as e:
    counter.record("IndexError")

try:
    int("invalid")
except ValueError as e:
    counter.record("ValueError")

print(f"Total errors: {counter.get_total()}")
print(f"Error counts: {counter.get_counts()}")
print(f"Top errors: {counter.get_top_errors()}")
```

## Error Rate Tracker

```python
from collections import deque
from time import time

class ErrorRateTracker:
    """Track error rate over time"""
    
    def __init__(self, window_seconds: int = 60):
        self.window_seconds = window_seconds
        self.timestamps = deque()
    
    def record_error(self):
        """Record an error"""
        now = time()
        self.timestamps.append(now)
        self._cleanup_old_errors(now)
    
    def _cleanup_old_errors(self, now: float):
        """Remove errors outside window"""
        cutoff = now - self.window_seconds
        
        while self.timestamps and self.timestamps[0] < cutoff:
            self.timestamps.popleft()
    
    def get_error_count(self) -> int:
        """Get error count in window"""
        self._cleanup_old_errors(time())
        return len(self.timestamps)
    
    def get_error_rate(self) -> float:
        """Get errors per second"""
        count = self.get_error_count()
        return count / self.window_seconds
    
    def is_above_threshold(self, threshold: float) -> bool:
        """Check if error rate exceeds threshold"""
        return self.get_error_rate() > threshold

# Usage
tracker = ErrorRateTracker(window_seconds=60)

# Record some errors
import time
for i in range(5):
    tracker.record_error()
    time.sleep(0.1)

print(f"Errors in last 60s: {tracker.get_error_count()}")
print(f"Error rate: {tracker.get_error_rate():.4f} errors/second")
print(f"Above threshold (0.01): {tracker.is_above_threshold(0.01)}")
```

## Error Reporter

```python
import logging
import traceback
from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional, Dict, Any

logger = logging.getLogger(__name__)

@dataclass
class ErrorReport:
    """Error report details"""
    timestamp: datetime
    error_type: str
    error_message: str
    stack_trace: str
    context: Dict[str, Any] = field(default_factory=dict)
    severity: str = "error"
    user_id: Optional[str] = None
    request_id: Optional[str] = None

class ErrorReporter:
    """
    Report errors with context.
    
    Features:
    - Capture full error details
    - Add context information
    - Store error reports
    - Export for analysis
    """
    
    def __init__(self):
        self.reports: List[ErrorReport] = []
    
    def report_exception(self,
                        exc: Exception,
                        context: Optional[Dict[str, Any]] = None,
                        severity: str = "error",
                        user_id: Optional[str] = None,
                        request_id: Optional[str] = None):
        """
        Report an exception with context.
        
        Args:
            exc: Exception to report
            context: Additional context
            severity: Error severity (error, warning, critical)
            user_id: User ID if applicable
            request_id: Request ID for tracing
        """
        report = ErrorReport(
            timestamp=datetime.now(),
            error_type=type(exc).__name__,
            error_message=str(exc),
            stack_trace=traceback.format_exc(),
            context=context or {},
            severity=severity,
            user_id=user_id,
            request_id=request_id
        )
        
        self.reports.append(report)
        
        # Log the error
        logger.error(
            f"[{severity.upper()}] {report.error_type}: {report.error_message}",
            extra={
                "error_type": report.error_type,
                "user_id": user_id,
                "request_id": request_id,
                "context": context
            }
        )
    
    def get_recent_errors(self, n: int = 10) -> List[ErrorReport]:
        """Get N most recent errors"""
        return self.reports[-n:]
    
    def get_errors_by_type(self, error_type: str) -> List[ErrorReport]:
        """Get errors of specific type"""
        return [r for r in self.reports if r.error_type == error_type]
    
    def get_error_summary(self) -> Dict[str, Any]:
        """Get error summary statistics"""
        if not self.reports:
            return {"total": 0, "by_type": {}, "by_severity": {}}
        
        by_type = defaultdict(int)
        by_severity = defaultdict(int)
        
        for report in self.reports:
            by_type[report.error_type] += 1
            by_severity[report.severity] += 1
        
        return {
            "total": len(self.reports),
            "by_type": dict(by_type),
            "by_severity": dict(by_severity),
            "first_error": self.reports[0].timestamp,
            "last_error": self.reports[-1].timestamp
        }
    
    def export_reports(self) -> List[Dict[str, Any]]:
        """Export reports for analysis"""
        return [
            {
                "timestamp": r.timestamp.isoformat(),
                "error_type": r.error_type,
                "error_message": r.error_message,
                "severity": r.severity,
                "user_id": r.user_id,
                "request_id": r.request_id,
                "context": r.context
            }
            for r in self.reports
        ]

# Usage
reporter = ErrorReporter()

# Report errors with context
try:
    result = 10 / 0
except ZeroDivisionError as e:
    reporter.report_exception(
        e,
        context={"operation": "divide", "a": 10, "b": 0},
        severity="error",
        user_id="user123",
        request_id="req-456"
    )

try:
    data = {"key": "value"}
    value = data["missing"]
except KeyError as e:
    reporter.report_exception(
        e,
        context={"data": data, "key": "missing"},
        severity="warning"
    )

# Get summary
summary = reporter.get_error_summary()
print(f"Error Summary:")
print(f"  Total: {summary['total']}")
print(f"  By Type: {summary['by_type']}")
print(f"  By Severity: {summary['by_severity']}")

# Get recent errors
recent = reporter.get_recent_errors(5)
print(f"\nRecent Errors: {len(recent)}")
for r in recent:
    print(f"  [{r.severity}] {r.error_type}: {r.error_message}")
```

## Health Check Monitor

```python
from enum import Enum
from typing import Callable, List, Tuple

class HealthStatus(Enum):
    """Health status"""
    HEALTHY = "healthy"
    DEGRADED = "degraded"
    UNHEALTHY = "unhealthy"

class HealthCheck:
    """Single health check"""
    
    def __init__(self, name: str, check_func: Callable[[], Tuple[bool, str]]):
        self.name = name
        self.check_func = check_func
    
    def run(self) -> Tuple[bool, str]:
        """Run health check"""
        try:
            return self.check_func()
        except Exception as e:
            return False, f"Check failed: {e}"

class HealthMonitor:
    """
    Monitor system health.
    
    Features:
    - Multiple health checks
    - Overall status determination
    - Detailed health reports
    """
    
    def __init__(self):
        self.checks: List[HealthCheck] = []
    
    def add_check(self, name: str, check_func: Callable[[], Tuple[bool, str]]):
        """Add health check"""
        self.checks.append(HealthCheck(name, check_func))
    
    def run_checks(self) -> Dict[str, Any]:
        """Run all health checks"""
        results = {}
        
        for check in self.checks:
            healthy, message = check.run()
            results[check.name] = {
                "healthy": healthy,
                "message": message
            }
        
        return results
    
    def get_status(self) -> HealthStatus:
        """Get overall health status"""
        results = self.run_checks()
        
        healthy_count = sum(1 for r in results.values() if r["healthy"])
        total_count = len(results)
        
        if healthy_count == total_count:
            return HealthStatus.HEALTHY
        elif healthy_count >= total_count / 2:
            return HealthStatus.DEGRADED
        else:
            return HealthStatus.UNHEALTHY
    
    def get_health_report(self) -> Dict[str, Any]:
        """Get detailed health report"""
        results = self.run_checks()
        status = self.get_status()
        
        return {
            "status": status.value,
            "checks": results,
            "timestamp": datetime.now().isoformat()
        }

# Example health checks
def check_database():
    """Check database connection"""
    try:
        # Simulate database check
        # In real code: db.ping() or similar
        return True, "Database connected"
    except Exception as e:
        return False, f"Database error: {e}"

def check_api():
    """Check API availability"""
    try:
        # Simulate API check
        # In real code: requests.get(api_url, timeout=5)
        return True, "API responding"
    except Exception as e:
        return False, f"API error: {e}"

def check_disk_space():
    """Check disk space"""
    import shutil
    
    try:
        usage = shutil.disk_usage("/")
        percent_used = (usage.used / usage.total) * 100
        
        if percent_used > 90:
            return False, f"Disk usage critical: {percent_used:.1f}%"
        elif percent_used > 80:
            return True, f"Disk usage high: {percent_used:.1f}%"
        else:
            return True, f"Disk usage ok: {percent_used:.1f}%"
    except Exception as e:
        return False, f"Disk check failed: {e}"

# Create monitor
monitor = HealthMonitor()
monitor.add_check("database", check_database)
monitor.add_check("api", check_api)
monitor.add_check("disk_space", check_disk_space)

# Get health report
report = monitor.get_health_report()
print(f"Health Status: {report['status']}")
print(f"Checks:")
for name, result in report['checks'].items():
    status = "✓" if result['healthy'] else "✗"
    print(f"  {status} {name}: {result['message']}")
```

## Error Alert System

```python
from enum import Enum

class AlertLevel(Enum):
    """Alert severity levels"""
    INFO = 1
    WARNING = 2
    ERROR = 3
    CRITICAL = 4

class Alert:
    """Alert notification"""
    
    def __init__(self, level: AlertLevel, message: str, context: Dict[str, Any]):
        self.level = level
        self.message = message
        self.context = context
        self.timestamp = datetime.now()

class AlertManager:
    """
    Manage error alerts.
    
    Features:
    - Alert thresholds
    - Alert rate limiting
    - Multiple notification channels
    """
    
    def __init__(self):
        self.alerts: List[Alert] = []
        self.thresholds = {
            "error_rate": 0.1,  # 0.1 errors/second
            "error_count": 100   # 100 errors total
        }
        self.error_tracker = ErrorRateTracker()
    
    def record_error(self, error_type: str, context: Dict[str, Any]):
        """Record error and check thresholds"""
        self.error_tracker.record_error()
        
        # Check error rate threshold
        if self.error_tracker.get_error_rate() > self.thresholds["error_rate"]:
            self._send_alert(
                AlertLevel.CRITICAL,
                f"Error rate exceeded threshold: {self.error_tracker.get_error_rate():.4f}",
                {"error_type": error_type, **context}
            )
        
        # Check error count threshold
        if self.error_tracker.get_error_count() > self.thresholds["error_count"]:
            self._send_alert(
                AlertLevel.ERROR,
                f"Error count exceeded threshold: {self.error_tracker.get_error_count()}",
                {"error_type": error_type, **context}
            )
    
    def _send_alert(self, level: AlertLevel, message: str, context: Dict[str, Any]):
        """Send alert notification"""
        alert = Alert(level, message, context)
        self.alerts.append(alert)
        
        # Log alert
        logger.warning(f"[ALERT {level.name}] {message}", extra=context)
        
        # In production, send to notification service:
        # - Email
        # - Slack
        # - PagerDuty
        # - SMS
        # etc.
    
    def get_active_alerts(self) -> List[Alert]:
        """Get active alerts"""
        return self.alerts
    
    def clear_alerts(self):
        """Clear all alerts"""
        self.alerts.clear()

# Usage
alert_manager = AlertManager()

# Simulate many errors
for i in range(150):
    alert_manager.record_error(
        "ValueError",
        {"operation": "validate", "value": i}
    )

# Check alerts
alerts = alert_manager.get_active_alerts()
print(f"Active Alerts: {len(alerts)}")
for alert in alerts:
    print(f"  [{alert.level.name}] {alert.message}")
```

## Error Dashboard

```python
from typing import Any

class ErrorDashboard:
    """
    Error dashboard with statistics.
    
    Provides:
    - Error counts and rates
    - Top errors
    - Recent errors
    - Health status
    """
    
    def __init__(self):
        self.counter = ErrorCounter()
        self.rate_tracker = ErrorRateTracker()
        self.reporter = ErrorReporter()
        self.health_monitor = HealthMonitor()
    
    def record_error(self, exc: Exception, context: Optional[Dict[str, Any]] = None):
        """Record error across all trackers"""
        error_type = type(exc).__name__
        
        self.counter.record(error_type)
        self.rate_tracker.record_error()
        self.reporter.report_exception(exc, context)
    
    def get_dashboard_data(self) -> Dict[str, Any]:
        """Get complete dashboard data"""
        return {
            "overview": {
                "total_errors": self.counter.get_total(),
                "error_rate": f"{self.rate_tracker.get_error_rate():.4f} errors/sec",
                "errors_last_minute": self.rate_tracker.get_error_count()
            },
            "top_errors": self.counter.get_top_errors(5),
            "recent_errors": [
                {
                    "type": r.error_type,
                    "message": r.error_message,
                    "time": r.timestamp.strftime("%H:%M:%S")
                }
                for r in self.reporter.get_recent_errors(10)
            ],
            "health": self.health_monitor.get_health_report(),
            "summary": self.reporter.get_error_summary()
        }
    
    def print_dashboard(self):
        """Print formatted dashboard"""
        data = self.get_dashboard_data()
        
        print("=" * 60)
        print("ERROR DASHBOARD")
        print("=" * 60)
        
        print("\nOVERVIEW:")
        for key, value in data["overview"].items():
            print(f"  {key}: {value}")
        
        print("\nTOP ERRORS:")
        for error_type, count in data["top_errors"]:
            print(f"  {error_type}: {count}")
        
        print("\nRECENT ERRORS:")
        for error in data["recent_errors"][:5]:
            print(f"  [{error['time']}] {error['type']}: {error['message']}")
        
        print("\nHEALTH STATUS:")
        print(f"  Status: {data['health']['status']}")
        for name, result in data['health']['checks'].items():
            status = "✓" if result['healthy'] else "✗"
            print(f"    {status} {name}: {result['message']}")
        
        print("=" * 60)

# Usage
dashboard = ErrorDashboard()

# Add health checks
dashboard.health_monitor.add_check("database", check_database)
dashboard.health_monitor.add_check("api", check_api)

# Simulate errors
try:
    10 / 0
except ZeroDivisionError as e:
    dashboard.record_error(e, {"operation": "divide"})

try:
    int("invalid")
except ValueError as e:
    dashboard.record_error(e, {"operation": "parse"})

try:
    [][10]
except IndexError as e:
    dashboard.record_error(e, {"operation": "index"})

# Display dashboard
dashboard.print_dashboard()
```

## Structured Logging for Monitoring

```python
import json
import logging

class JSONFormatter(logging.Formatter):
    """Format logs as JSON for monitoring tools"""
    
    def format(self, record):
        log_data = {
            "timestamp": datetime.utcfromtimestamp(record.created).isoformat(),
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
        }
        
        # Add exception info if present
        if record.exc_info:
            log_data["exception"] = {
                "type": record.exc_info[0].__name__,
                "message": str(record.exc_info[1]),
                "traceback": self.formatException(record.exc_info)
            }
        
        # Add extra fields
        if hasattr(record, "user_id"):
            log_data["user_id"] = record.user_id
        if hasattr(record, "request_id"):
            log_data["request_id"] = record.request_id
        
        return json.dumps(log_data)

# Configure structured logging
handler = logging.StreamHandler()
handler.setFormatter(JSONFormatter())

logger = logging.getLogger("app")
logger.addHandler(handler)
logger.setLevel(logging.INFO)

# Log errors with structured data
try:
    result = 10 / 0
except ZeroDivisionError as e:
    logger.error(
        "Division by zero",
        exc_info=True,
        extra={
            "user_id": "user123",
            "request_id": "req-456"
        }
    )
```

## Summary

**Error Monitoring Components:**
- **ErrorCounter**: Track errors by type
- **ErrorRateTracker**: Monitor error rates over time
- **ErrorReporter**: Capture full error details with context
- **HealthMonitor**: System health checks
- **AlertManager**: Threshold-based alerts
- **ErrorDashboard**: Consolidated view

**Best Practices:**
- Track error counts and rates
- Capture full context with errors
- Set up health checks
- Configure alert thresholds
- Use structured logging (JSON)
- Export data for analysis
- Monitor critical metrics
- Set up automated alerts
- Create error dashboards
- Review errors regularly

**Monitoring Goals:**
- Detect issues quickly
- Understand error patterns
- Track system health
- Alert on critical errors
- Enable quick debugging
- Measure error rates
- Identify trends
- Support root cause analysis
