def add_time(start, duration, weekday=None):
    # Define initial variables
    days_of_week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    # Split the start time
    time, period = start.split()
    start_hour, start_minute = map(int, time.split(':'))

    # Handle the period (AM/PM) conversion to 24-hour format
    if period == 'PM':
        start_hour += 12 if start_hour != 12 else 0
    elif period == 'AM' and start_hour == 12:
        start_hour = 0

    # Split the duration into hours and minutes
    duration_hours, duration_minutes = map(int, duration.split(':'))

    # Calculate new time
    total_minutes = start_minute + duration_minutes
    additional_hours = total_minutes // 60
    new_minute = total_minutes % 60

    total_hours = start_hour + duration_hours + additional_hours
    new_hour = total_hours % 24
    days_later = total_hours // 24

    # Handle 12-hour format conversion
    if new_hour >= 12:
        period = 'PM'
        new_hour = new_hour - 12 if new_hour > 12 else new_hour
    else:
        period = 'AM'
        new_hour = 12 if new_hour == 0 else new_hour

    # Handle weekday if provided
    if weekday:
        weekday_index = days_of_week.index(weekday.capitalize())
        new_weekday = days_of_week[(weekday_index + days_later) % 7]
        weekday_output = f", {new_weekday}"
    else:
        weekday_output = ''

    # Handle days later output
    if days_later == 0:
        day_output = ''
    elif days_later == 1:
        day_output = ' (next day)'
    else:
        day_output = f' ({days_later} days later)'

    new_time = f"{new_hour}:{new_minute:02d} {period}{weekday_output}{day_output}"

    return new_time
