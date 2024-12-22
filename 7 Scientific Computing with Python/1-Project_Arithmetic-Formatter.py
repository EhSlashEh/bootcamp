def arithmetic_arranger(problems, show_answers=False):
    if len(problems) > 5:
        return 'Error: Too many problems.'

    first_line = ""
    second_line = ""
    dashes = ""
    results = ""

    # Iterate through the list of problems to check operators
    for problem in problems:
        parts = problem.split()
        num1 = parts[0]
        operator = parts[1]
        num2 = parts[2]
        
        if operator not in ['+', '-']:
            return "Error: Operator must be '+' or '-'."
        if not (num1.isdigit() and num2.isdigit()):
            return 'Error: Numbers must only contain digits.'
        if len(num1) > 4 or len(num2) > 4:
            return 'Error: Numbers cannot be more than four digits.'

        # Calculate the width needed for formatting
        width = max(len(num1), len(num2)) + 2

        # Add each part to the respective lines
        first_line += num1.rjust(width) + "    "
        second_line += operator + num2.rjust(width - 1) + "    "
        dashes += "-" * width + "    "

        # Calculate the result and add it if show_answers is True
        if show_answers:
            if operator == '+':
                result = str(int(num1) + int(num2))
            else:
                result = str(int(num1) - int(num2))
            results += result.rjust(width) + "    "

    # Remove trailing spaces and assemble the arranged problems into a single string
    arranged_problems = first_line.rstrip() + "\n" + second_line.rstrip() + "\n" + dashes.rstrip()

    # Include the results line if show_answers is True
    if show_answers:
        arranged_problems += "\n" + results.rstrip()

    return arranged_problems

# Test Cases with print statements to show return values
# 1
print(arithmetic_arranger(["3801 - 2", "123 + 49"]))
print('\n')

# 2
print(arithmetic_arranger(["1 + 2", "1 - 9380"]))
print('\n')

# 3
print(arithmetic_arranger(["3 + 855", "3801 - 2", "45 + 43", "123 + 49"]))
print('\n')

# 4
print(arithmetic_arranger(["11 + 4", "3801 - 2999", "1 + 2", "123 + 49", "1 - 9380"]))
print('\n')

# 5
print(arithmetic_arranger(["44 + 815", "909 - 2", "45 + 43", "123 + 49", "888 + 40", "653 + 87"]))
print('\n')

# 6
print(arithmetic_arranger(["3 / 855", "3801 - 2", "45 + 43", "123 + 49"]))  
print('\n')


# 7
print(arithmetic_arranger(["24 + 85215", "3801 - 2", "45 + 43", "123 + 49"]))  
print('\n')


# 8
print(arithmetic_arranger(["98 + 3g5", "3801 - 2", "45 + 43", "123 + 49"]))
print('\n')


# 9
print(arithmetic_arranger(["3 + 855", "988 + 40"], True))
print('\n')


# 10
print(arithmetic_arranger(["32 - 698", "1 - 3801", "45 + 43", "123 + 49", "988 + 40"], True))
print('\n')

