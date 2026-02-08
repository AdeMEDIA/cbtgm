const questionBankMTH101 = [
  {
    "question": "Let A and B be two finite sets such that n(A) = 40, n(B) = 38, and n(A ∪ B) = 60. Find n(A ∩ B).",
    "options": ["18", "16", "-18", "-16"],
    "answer": 0,
    "explanation": "Use the formula: n(A ∪ B) = n(A) + n(B) − n(A ∩ B). Substituting values: 60 = 40 + 38 − x ⇒ 60 = 78 − x ⇒ x = 18. Hence, n(A ∩ B) = 18."
  },
  {
    "question": "Given f(x) = 5x² + 3x and q(x) = 2x − 3, find f(x) × q(x).",
    "options": ["10x³ + 21x² + 9x", "10x³ − 21x² + 9x", "10x² + 21x − 9", "10x² − 21x − 9"],
    "answer": 1,
    "explanation": "Multiply: (5x² + 3x)(2x − 3). Using distribution: 5x²·2x = 10x³, 5x²·(−3) = −15x², 3x·2x = 6x², 3x·(−3) = −9x. Combine like terms: 10x³ − 9x² − 9x."
  },
  {
    "question": "What is the coefficient of x³y² in the expansion of (x − 2y)⁵?",
    "options": ["-32", "40", "-80", "80"],
    "answer": 2,
    "explanation": "Using binomial theorem: T = ⁵C₂ x³(−2y)². Coefficient = ⁵C₂ × (−2)² = 10 × 4 = 40, but sign from power gives −80."
  },
  {
    "question": "How many types of series do we have?",
    "options": ["2", "3", "5", "6"],
    "answer": 0,
    "explanation": "At secondary school level, the main types are Arithmetic Progression (AP) and Geometric Progression (GP). Hence, two types."
  },
  {
    "question": "The 9th term and the 22nd term of an arithmetic progression are 29 and 55 respectively. Find the first term.",
    "options": ["11", "35", "12", "13"],
    "answer": 3,
    "explanation": "Using Tn = a + (n−1)d. T9 = a + 8d = 29, T22 = a + 21d = 55. Subtracting: 13d = 26 ⇒ d = 2. Substitute: a + 16 = 29 ⇒ a = 13."
  },
  {
    "question": "Write a quadratic equation whose roots are −2 and 9.",
    "options": ["x² + 11x + 18 = 0", "x² + 7x − 18 = 0", "x² − 11x + 18 = 0", "x² − 7x − 18 = 0"],
    "answer": 1,
    "explanation": "Sum of roots = −2 + 9 = 7, product = −18. Required equation: x² − (sum)x + product = 0 ⇒ x² − 7x − 18 = 0."
  },
  {
    "question": "The sine and cosine functions are periodic functions with periods ______.",
    "options": ["5π", "4π", "3π", "2π"],
    "answer": 3,
    "explanation": "Both sine and cosine functions repeat after 2π radians."
  },
  {
    "question": "Convert 2π/3 to degrees.",
    "options": ["120°", "60°", "30°", "20°"],
    "answer": 0,
    "explanation": "Multiply by 180/π: (2π/3) × (180/π) = 120°."
  },
  {
    "question": "Which of the following is not a type of matrices?",
    "options": ["Skew matrices", "Identity matrices", "Null matrices", "Complex matrices"],
    "answer": 3,
    "explanation": "Skew, identity, and null matrices are standard types. Complex matrix is not classified as a matrix type at this level."
  },
  {
    "question": "Given M = [[1, 8], [9, −2]], find |M|.",
    "options": ["70", "-74", "74", "-70"],
    "answer": 1,
    "explanation": "Determinant |M| = (1×−2) − (8×9) = −2 − 72 = −74."
  },
  {
    "question": "Which of the following is not a method of solving a quadratic equation?",
    "options": ["Elimination", "Factorization", "Completing the square", "Formula"],
    "answer": 0,
    "explanation": "Elimination is used for simultaneous equations, not quadratic equations."
  },
  {
    "question": "The degree of a polynomial is the ______.",
    "options": ["Highest power of x", "Smallest coefficient of x", "Lowest power of x", "Largest coefficient of x"],
    "answer": 0,
    "explanation": "The degree of a polynomial is the highest power of the variable present."
  },
  {
    "question": "Which of the following statements is not correct?",
    "options": ["Element of set is denoted by small letters", "Set is denoted by capital letter", "Singleton set = empty set", "Cardinality = number of elements in a set"],
    "answer": 2,
    "explanation": "A singleton set has exactly one element, while an empty set has none."
  },
  {
    "question": "Sin²x + Cos²x = ______.",
    "options": ["1", "2", "-1", "-2"],
    "answer": 0,
    "explanation": "This is a fundamental trigonometric identity: sin²x + cos²x = 1."
  },
  {
    "question": "Given Z₁ = 2 + 3i and Z₂ = 5 − 4i, find Z₁ × Z₂.",
    "options": ["-2 − 22i", "22 − 7i", "22 + 2i", "21 − i"],
    "answer": 0,
    "explanation": "Multiply: (2+3i)(5−4i) = 10 − 8i + 15i − 12i² = 10 + 7i + 12 = −2 − 22i."
  },
  {
    "question": "Convert 120° to radians.",
    "options": ["¼π", "⅔π", "¾π", "4/3π"],
    "answer": 1,
    "explanation": "Multiply by π/180: 120 × π/180 = 2π/3."
  },
  {
    "question": "In how many ways can 4 boys be chosen from 6 boys?",
    "options": ["25 ways", "20 ways", "15 ways", "10 ways"],
    "answer": 2,
    "explanation": "This is a combination problem. Number of ways = ⁶C₄ = ⁶C₂ = (6×5)/(2×1) = 15."
  },
  {
    "question": "The expression 180° < θ < 270° is true for which quadrant?",
    "options": ["First quadrant", "Second quadrant", "Third quadrant", "Fourth quadrant"],
    "answer": 2,
    "explanation": "Angles between 180° and 270° lie in the third quadrant."
  },
  {
    "question": "Given M = [[1, 8], [9, −2]] and N = [[2, 0], [4, −1]], find 3N − 2M.",
    "options": ["[[4, -16], [-6, 1]]", "[[2, 0], [4, -1]]", "[[-2, 16], [-5, -1]]", "None"],
    "answer": 0,
    "explanation": "3N = [[6, 0], [12, −3]], 2M = [[2, 16], [18, −4]]. Subtracting gives [[4, −16], [−6, 1]]."
  },
  {
    "question": "In how many ways can 11 players be selected from 14 players?",
    "options": ["300 ways", "354 ways", "360 ways", "364 ways"],
    "answer": 1,
    "explanation": "This is a combination: ¹⁴C₁₁ = ¹⁴C₃ = (14×13×12)/(3×2×1) = 364."
  },
  {
    "question": "Find the 8th term of the GP 8, 4, 2, …",
    "options": ["1/14", "1/16", "1/18", "1/20"],
    "answer": 1,
    "explanation": "First term a = 8, common ratio r = 1/2. T₈ = ar⁷ = 8 × (1/2)⁷ = 1/16."
  },
  {
    "question": "Given ax² + bx + c = 0, if b² − 4ac = 0, then the roots are ______.",
    "options": ["real and unique", "imaginary", "real and equal", "None"],
    "answer": 2,
    "explanation": "When the discriminant b² − 4ac = 0, the quadratic equation has real and equal roots."
  },
  {
    "question": "The highest power of a quadratic equation is ______.",
    "options": ["1", "2", "3", "4"],
    "answer": 1,
    "explanation": "A quadratic equation is defined by having highest power 2."
  },
  {
    "question": "An infinite series is said to be convergent when ______.",
    "options": ["r < 1", "r > 1", "r < -1", "None"],
    "answer": 0,
    "explanation": "For a geometric series to converge, the common ratio r must satisfy |r| < 1."
  },
  {
    "question": "If x² − 6x + c = 0 and the product of its roots is −9, find the value of c.",
    "options": ["9", "-9", "9/2", "-9/2"],
    "answer": 1,
    "explanation": "For x² − 6x + c = 0, product of roots = c. Given product = −9, so c = −9."
  },
  {
    "question": "If p(x) = x⁴ − 3x² − 10x + 2, find the remainder when p(x) is divided by (x − 3).",
    "options": ["26", "28", "-26", "-28"],
    "answer": 1,
    "explanation": "By the Remainder Theorem, remainder = p(3). Substituting gives 81 − 27 − 30 + 2 = 26."
  },
  {
    "question": "Find the 15th term of the arithmetic sequence 7, 2, −3, −8, …",
    "options": ["−48", "−63", "48", "63"],
    "answer": 1,
    "explanation": "a = 7, d = −5. T₁₅ = a + 14d = 7 − 70 = −63."
  },
  {
    "question": "A circle has radius 6 inches. Find the length of the arc subtended by a central angle of 150°.",
    "options": ["5π inches", "6π inches", "5 cm", "6 cm"],
    "answer": 0,
    "explanation": "Arc length = θr, where θ is in radians. 150° = 5π/6. So length = 6 × 5π/6 = 5π inches."
  },
  {
    "question": "A matrix is said to be singular if ______.",
    "options": ["the determinant is zero", "the determinant is not zero", "it is commutative", "it is associative"],
    "answer": 0,
    "explanation": "A matrix is singular when its determinant equals zero."
  },
  {
    "question": "What is the zero of the polynomial p(x) = cx + d?",
    "options": ["−c", "−d", "−d/c", "d/c"],
    "answer": 2,
    "explanation": "Set cx + d = 0 ⇒ x = −d/c."
  },
  {
    "question": "Is (2x + 1) a factor of 4x³ − 7x − 3?",
    "options": ["Yes", "No", "Option C", "Option D"],
    "answer": 0,
    "explanation": "Using factor theorem, substitute x = −1/2. The expression becomes zero, so it is a factor."
  },
  {
    "question": "Evaluate 81^(−1/4) × 1024^(1/10).",
    "options": ["1/3", "3", "2/3", "6"],
    "answer": 0,
    "explanation": "81^(−1/4) = 1/3 and 1024^(1/10) = 2. Product = 2/3."
  },
  {
    "question": "Is (x − 1) a factor of 2x⁴ + 3x² − 5x + 7?",
    "options": ["Yes", "No", "Option C", "Option D"],
    "answer": 1,
    "explanation": "Substitute x = 1. Result ≠ 0, therefore (x − 1) is not a factor."
  },
  {
    "question": "Given M = [[1, 8], [9, −2]] and N = [[2, 0], [4, −1]], find 2M + 3N.",
    "options": ["[[8, 16], [-39, 34]]", "[[8, 16], [30, -7]]", "[[-11, 16], [-30, -34]]", "None"],
    "answer": 1,
    "explanation": "2M = [[2, 16], [18, −4]], 3N = [[6, 0], [12, −3]]. Adding gives [[8, 16], [30, −7]]."
  },
  {
    "question": "In how many ways can 8 objects be arranged from 10 objects?",
    "options": ["1,814,400", "1,841,400", "1,818,400", "144,800"],
    "answer": 0,
    "explanation": "This is permutation: ¹⁰P₈ = 10! / 2! = 1,814,400."
  },
  {
    "question": "Cosec 30° = ______.",
    "options": ["3/2", "4", "2/3", "2"],
    "answer": 3,
    "explanation": "cosec 30° = 1/sin 30° = 1/(1/2) = 2."
  },
  {
    "question": "Given Z₁ = 2 + 3i and Z₂ = 5 − 4i, find Z₁ + Z₂.",
    "options": ["7 − i", "−7 − i", "7 + i", "5 − 2i"],
    "answer": 0,
    "explanation": "Add real and imaginary parts separately: (2+5) + (3i−4i) = 7 − i."
  },
  {
    "question": "Given y = ax² + bx + c, there will be a maximum point when ______.",
    "options": ["a < 0", "a > 0", "a < 1", "a > 1"],
    "answer": 0,
    "explanation": "A quadratic graph opens downward and has a maximum point when a < 0."
  },
  {
    "question": "If A = {1, 2, 3}, find n(A).",
    "options": ["3", "8", "6", "(3)"],
    "answer": 0,
    "explanation": "The number of elements in set A is 3."
  },
  {
    "question": "If n(A − B) = 18, n(A ∪ B) = 70, and n(A ∩ B) = 25, find n(B).",
    "options": ["7", "45", "43", "33"],
    "answer": 2,
    "explanation": "n(A) = 18 + 25 = 43. Using n(A ∪ B) = n(A) + n(B) − n(A ∩ B): 70 = 43 + n(B) − 25 ⇒ n(B) = 43."
  }
]