class Category:
    def __init__(self, name):
        self.name = name
        self.ledger = []
        self.balance = 0  # To keep track of the current balance

    def deposit(self, amount, description=""):
        self.ledger.append({"amount": amount, "description": description})
        self.balance += amount

    def withdraw(self, amount, description=""):
        if self.check_funds(amount):
            self.ledger.append({"amount": -amount, "description": description})
            self.balance -= amount
            return True
        return False

    def get_balance(self):
        return self.balance

    def transfer(self, amount, category):
        if self.check_funds(amount):
            self.withdraw(amount, f"Transfer to {category.name}")
            category.deposit(amount, f"Transfer from {self.name}")
            return True
        return False

    def check_funds(self, amount):
        return amount <= self.balance

    def __str__(self):
        title = f"{self.name:*^30}\n"
        items = ""
        for entry in self.ledger:
            items += f"{entry['description'][:23]:23}{entry['amount']:>7.2f}\n"
        total = f"Total: {self.balance:.2f}"
        return title + items + total

def create_spend_chart(categories):
    total_spent = 0
    category_spent = {}

    # Calculate total spent per category
    for category in categories:
        spent = sum(-item['amount'] for item in category.ledger if item['amount'] < 0)
        total_spent += spent
        category_spent[category.name] = spent

    # Calculate percentage spent per category
    for name in category_spent:
        category_spent[name] = int((category_spent[name] / total_spent) * 100)

    # Create chart
    chart = "Percentage spent by category\n"
    for i in range(100, -1, -10):
        chart += f"{i:>3}| "
        for name in category_spent:
            chart += "o  " if category_spent[name] >= i else "   "
        chart += "\n"

    # Footer
    chart += "    -" + "---" * len(category_spent) + "\n"

    # Add category names vertically
    max_length = max(len(name) for name in category_spent)
    for i in range(max_length):
        chart += "     "
        for name in category_spent:
            chart += name[i] + "  " if i < len(name) else "   "
        chart += "\n"

    return chart.rstrip("\n")

food = Category("Food")
clothing = Category("Clothing")
entertainment = Category("Entertainment")

food.deposit(1000, "initial deposit")
food.withdraw(50.75, "groceries")
food.withdraw(15.89, "restaurant and more food")

clothing.deposit(500, "initial deposit")
clothing.withdraw(100, "new shoes")

entertainment.deposit(300, "initial deposit")
entertainment.withdraw(20, "movies")

print(food)
print(clothing)
print(entertainment)

print(create_spend_chart([food, clothing, entertainment]))
