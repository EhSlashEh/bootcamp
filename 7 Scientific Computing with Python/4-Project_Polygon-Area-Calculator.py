class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def set_width(self, width):
        self.width = width

    def set_height(self, height):
        self.height = height

    def get_area(self):
        return self.width * self.height

    def get_perimeter(self):
        return 2 * self.width + 2 * self.height

    def get_diagonal(self):
        return (self.width ** 2 + self.height ** 2) ** 0.5

    def get_picture(self):
        if self.width > 50 or self.height > 50:
            return "Too big for picture."
        picture = ("*" * self.width + "\n") * self.height
        return picture

    def get_amount_inside(self, shape):
        return (self.width // shape.width) * (self.height // shape.height)

    def __str__(self):
        return f"Rectangle(width={self.width}, height={self.height})"


class Square(Rectangle):
    def __init__(self, side):
        super().__init__(side, side)

    def set_side(self, side):
        self.width = side
        self.height = side

    def set_width(self, width):
        self.set_side(width)

    def set_height(self, height):
        self.set_side(height)

    def __str__(self):
        return f"Square(side={self.width})"

# Test 4: String representation of Rectangle
print(Rectangle(3, 6))

# Test 5: String representation of Square
print(Square(5))

# Test 6: Rectangle get_area
print(Rectangle(3, 6).get_area())

# Test 7: Square get_area
print(Square(5).get_area())

# Test 8: Rectangle get_perimeter
print(Rectangle(3, 6).get_perimeter())

# Test 9: Square get_perimeter
print(Square(5).get_perimeter())

# Test 10: Rectangle get_diagonal
print(Square(5).get_diagonal())

# Test 11: Square get_diagonal
print(Square(5).get_diagonal())

# Test 15: Rectangle get_picture representation
print(Rectangle(3, 6).get_picture())

# Test 16: Square get_picture representation
print(Square(5).get_picture())
