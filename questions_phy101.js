// questions_physics101.js - General Physics (100 Questions)

const questionBankPHY101 = [
    {
        "question": "If the string is stretched by two opposite forces of 10 N, then the tension in the string is",
        "options": ["5 N", "20 N", "10 N", "0 N"],
        "answer": 2,
        "explanation": "Tension is the force transmitted through the string. When pulled by equal and opposite forces of 10 N, the tension throughout the string is 10 N."
    },
    {
        "question": "If we place some coins over the paper strip and pull it with a jerk then the coins don't fall off because of",
        "options": ["friction", "inertia", "resistance", "force"],
        "answer": 1,
        "explanation": "Due to inertia, the coins tend to remain at rest when the paper is jerked quickly, causing them to stay in place."
    },
    {
        "question": "To every action, there is always an equal but opposite reaction. This statement is known as",
        "options": ["Newton's first law", "Newton's second law", "Newton's third law", "law of momentum"],
        "answer": 2,
        "explanation": "Newton's third law states that for every action force, there is an equal and opposite reaction force."
    },
    {
        "question": "The banking of road prevents vehicles from",
        "options": ["rolling", "sliding", "over speeding", "skidding"],
        "answer": 3,
        "explanation": "Banking provides the necessary centripetal force for turning, reducing the tendency to skid sideways."
    },
    {
        "question": "A cyclist of mass 30 kg exerts a force of 250 N to move his cycle with acceleration of 4 m/s². The force of friction between the road and the tire is",
        "options": ["120 N", "130 N", "150 N", "115 N"],
        "answer": 1,
        "explanation": "Net force = ma = 30 × 4 = 120 N. Applied force = 250 N, so friction = 250 - 120 = 130 N opposing motion."
    },
    {
        "question": "The force that produces an acceleration of 1 meter per second square in a body of mass 1 kg is called",
        "options": ["slow newton", "zero newton", "one newton", "two newton"],
        "answer": 2,
        "explanation": "By definition: 1 N = 1 kg × 1 m/s²"
    },
    {
        "question": "As weight is a force so it is a ___ quantity",
        "options": ["vector", "fixed", "variable", "scalar"],
        "answer": 0,
        "explanation": "Weight has both magnitude and direction (toward Earth's center), making it a vector quantity."
    },
    {
        "question": "At high speed the friction is",
        "options": ["increase", "zero", "decrease", "infinite"],
        "answer": 2,
        "explanation": "Kinetic friction is generally less than static friction and may decrease slightly at very high speeds due to reduced contact time."
    },
    {
        "question": "The ratio of the force of limiting friction to normal reaction is",
        "options": ["Zero", ">1", "<1", "constant"],
        "answer": 3,
        "explanation": "This ratio is the coefficient of friction (μ), which is constant for given surfaces."
    },
    {
        "question": "The push and pull that moves or tend to move, stops or tends to stop the motion of a body is known as",
        "options": ["friction", "force", "acceleration", "momentum"],
        "answer": 1,
        "explanation": "Force is defined as any interaction that changes the motion of an object."
    },
    {
        "question": "A body at rest or moving with uniform velocity will have acceleration of",
        "options": ["1 m/s²", "0 m/s²", "minimum acceleration", "maximum acceleration"],
        "answer": 1,
        "explanation": "Acceleration is the rate of change of velocity. Constant velocity means zero acceleration."
    },
    {
        "question": "In order to satisfy the first condition of particles in equilibrium, if the rightward forces are positive, the leftward forces must be",
        "options": ["positive", "halved", "negative", "doubled"],
        "answer": 2,
        "explanation": "For equilibrium, sum of forces = 0. If rightward forces are positive, leftward must be negative to cancel."
    },
    {
        "question": "If a system of particles is at rest or in uniform velocity, it is said to be in",
        "options": ["rest", "uniform motion", "equilibrium", "constant forces"],
        "answer": 2,
        "explanation": "Equilibrium means no net force, so either at rest or moving with constant velocity."
    },
    {
        "question": "The sum of all the forces acting on a body is zero. This condition represents equilibrium's ___ condition",
        "options": ["first", "second", "third", "fourth"],
        "answer": 0,
        "explanation": "First condition: ΣF = 0 (translational equilibrium)."
    },
    {
        "question": "To satisfy the first condition of equilibrium, if the upward forces are positive then the downward forces must be",
        "options": ["positive", "negative", "upward", "downward"],
        "answer": 1,
        "explanation": "For vertical equilibrium: ΣFy = 0. If upward forces are positive, downward must be negative."
    },
    {
        "question": "In a circular motion, the acceleration is directed towards the",
        "options": ["tangential path of the circle", "centre of the circle", "parallel path of the circle", "opposite to the centre of the circle"],
        "answer": 1,
        "explanation": "Centripetal acceleration always points toward the center of the circular path."
    },
    {
        "question": "When the net force on a particle is not zero, the particle is",
        "options": ["at equilibrium", "dynamic", "accelerating", "both b and c"],
        "answer": 3,
        "explanation": "Non-zero net force causes acceleration (F=ma), and an accelerating particle is dynamic (in motion)."
    },
    {
        "question": "In a uniform circular motion, acceleration increases with force and decreases with mass",
        "options": ["True", "False", "Both a and b", "Neither a nor b"],
        "answer": 0,
        "explanation": "From F=ma, for constant force, a ∝ 1/m. For circular motion: a = v²/r, independent of mass for given v and r."
    },
    {
        "question": "Under Newton's law of gravity: (i) gravity causes attraction between all objects in the universe (ii) attraction increases with mass and decreases with distance (iii) gravitational acceleration is independent of an object's mass. Which statements are correct?",
        "options": ["All are true", "Only i and ii are correct", "Only ii and iii are correct", "Only i and iii are correct"],
        "answer": 0,
        "explanation": "All are correct: (i) Universal gravitation, (ii) F ∝ m₁m₂/r², (iii) g = GM/r² (independent of falling object's mass)."
    },
    {
        "question": "The unit of coefficient of friction is",
        "options": ["Nm/s²", "N²/m³", "unitless", "N/m³"],
        "answer": 2,
        "explanation": "μ = Ffriction/Fnormal, both forces in Newtons, so μ is dimensionless."
    },
    {
        "question": "The coefficient of friction must be less than one",
        "options": ["False", "True", "Not in all cases", "None of the above"],
        "answer": 0,
        "explanation": "False. μ can be >1 (e.g., rubber on concrete ~1.0-1.2)."
    },
    {
        "question": "Where there is relative motion, the magnitude of friction is",
        "options": ["kinetic", "static", "both a and b", "none of the above"],
        "answer": 0,
        "explanation": "Kinetic friction acts when surfaces are sliding relative to each other."
    },
    {
        "question": "Where there is no relative motion the magnitude of friction is",
        "options": ["fs ≤ μsFN", "fk ≤ μkFN", "fs > μsFN", "fk > μkFN"],
        "answer": 0,
        "explanation": "Static friction: fs ≤ μsFN (equal to applied force up to maximum)."
    },
    {
        "question": "Where there is relative motion the magnitude of friction is",
        "options": ["fs ≤ μsFN", "fk ≤ μkFN", "fs = μsFN", "fk = μkFN"],
        "answer": 3,
        "explanation": "Kinetic friction: fk = μkFN (approximately constant)."
    },
    {
        "question": "What is the shortest distance in which an automobile travelling on a level road at 100 km/hr can be stopped when the coefficient of friction between the tyre and the road is 0.5?",
        "options": ["78.75 m", "98.5 m", "79.89 m", "85.68 m"],
        "answer": 0,
        "explanation": "v=100 km/h=27.78 m/s. Deceleration a=μg=0.5×9.8=4.9 m/s². Distance: v²/2a=(27.78)²/(2×4.9)=78.75 m."
    },
    {
        "question": "Calculate the distance of an automobile travelling on a wet road with coefficient of friction of 0.3 at 27.78 m/s",
        "options": ["211.50 m", "131.25 m", "400.23 m", "567.3 m"],
        "answer": 1,
        "explanation": "a=μg=0.3×9.8=2.94 m/s². Distance: v²/2a=(27.78)²/(2×2.94)=131.25 m."
    },
    {
        "question": "A student pushes a book against a vertical wall with a normal force of 25.0 N. Determine the minimum coefficient of static friction between the book and the wall such that 1.5 kg book will remain stationary",
        "options": ["0.68", "0.59", "0.42", "0.95"],
        "answer": 1,
        "explanation": "Weight=mg=1.5×9.8=14.7 N down. Friction must balance this: μs×25 ≥ 14.7 ⇒ μs ≥ 0.588."
    },
    {
        "question": "A 0.001 kg bullet is fired with a velocity of 800 m/s into a soft wood of mass 1 kg resting on a smooth surface. Find the final velocity if the bullet is fully embedded in the wood after collision",
        "options": ["0.8 m/s", "0.6 m/s", "0.98 m/s", "0.2 m/s"],
        "answer": 0,
        "explanation": "Momentum conservation: (0.001×800) + (1×0) = (1.001)×v ⇒ v=0.8/1.001≈0.8 m/s."
    },
    {
        "question": "A 0.001 kg bullet is fired with a velocity of 800 m/s into a soft wood of mass 1 kg resting on a smooth surface. What is the impulse of the bullet?",
        "options": ["0.8 Ns", "0.6 Ns", "0.98 Ns", "0.2 Ns"],
        "answer": 0,
        "explanation": "Impulse = change in momentum = 0.001×(0-800) = -0.8 Ns (magnitude 0.8 Ns)."
    },
    {
        "question": "What is the speed of a satellite in a circular orbit just above the surface of the earth if the radius of the satellite is 6.4 × 10⁶ m and acceleration due to gravity is 9.8 m/s²?",
        "options": ["7.92 × 10³ m/s", "7.92 × 10⁵ m/s", "7.92 × 10² m/s", "79.2 × 10³ m/s"],
        "answer": 0,
        "explanation": "Orbital speed v=√(gR)=√(9.8×6.4×10⁶)=√(62.72×10⁶)=7.92×10³ m/s."
    },
    {
        "question": "The SI unit of displacement is",
        "options": ["meter", "second", "kilogram", "newton"],
        "answer": 0,
        "explanation": "Displacement is a length measurement, so meter is the SI unit."
    },
    {
        "question": "Which of the following is a fundamental unit?",
        "options": ["Newton", "Joule", "Meter", "Watt"],
        "answer": 2,
        "explanation": "Meter is a base SI unit. Others are derived units."
    },
    {
        "question": "The dimension of velocity is",
        "options": ["LT", "LT⁻¹", "LT⁻²", "L²T⁻¹"],
        "answer": 1,
        "explanation": "Velocity = length/time ⇒ [L][T]⁻¹"
    },
    {
        "question": "1 kilometer is equal to how many meters?",
        "options": ["10 m", "100 m", "1000 m", "10000 m"],
        "answer": 2,
        "explanation": "1 km = 1000 m by definition."
    },
    {
        "question": "The dimension of acceleration is",
        "options": ["LT", "LT⁻¹", "LT⁻²", "L²T"],
        "answer": 2,
        "explanation": "Acceleration = velocity/time = (L/T)/T = L/T²"
    },
    {
        "question": "Which of the following is a derived unit?",
        "options": ["Kilogram", "Second", "Newton", "Meter"],
        "answer": 2,
        "explanation": "Newton = kg·m/s² is derived from base units."
    },
    {
        "question": "The SI unit of force is",
        "options": ["Joule", "Newton", "Watt", "Pascal"],
        "answer": 1,
        "explanation": "Force is measured in Newtons (N)."
    },
    {
        "question": "Kinematics is the study of motion without considering",
        "options": ["velocity", "displacement", "force", "acceleration"],
        "answer": 2,
        "explanation": "Kinematics describes motion (position, velocity, acceleration) without considering forces."
    },
    {
        "question": "Displacement is a ___ quantity",
        "options": ["scalar", "vector", "dimensionless", "constant"],
        "answer": 1,
        "explanation": "Displacement has both magnitude and direction."
    },
    {
        "question": "Distance is a ___ quantity",
        "options": ["vector", "scalar", "tensor", "variable"],
        "answer": 1,
        "explanation": "Distance has only magnitude, no direction."
    },
    {
        "question": "Speed is the ___ of velocity",
        "options": ["direction", "magnitude", "component", "derivative"],
        "answer": 1,
        "explanation": "Speed = |velocity| (magnitude only)."
    },
    {
        "question": "If a body moves with constant velocity, its acceleration is",
        "options": ["increasing", "zero", "decreasing", "constant"],
        "answer": 1,
        "explanation": "Constant velocity ⇒ zero acceleration."
    },
    {
        "question": "The slope of a displacement-time graph gives",
        "options": ["acceleration", "velocity", "distance", "force"],
        "answer": 1,
        "explanation": "Slope = Δx/Δt = velocity."
    },
    {
        "question": "The slope of a velocity-time graph gives",
        "options": ["displacement", "velocity", "acceleration", "distance"],
        "answer": 2,
        "explanation": "Slope = Δv/Δt = acceleration."
    },
    {
        "question": "The area under a velocity-time graph represents",
        "options": ["velocity", "displacement", "acceleration", "force"],
        "answer": 1,
        "explanation": "Area = ∫v dt = displacement."
    },
    {
        "question": "In uniformly accelerated motion, the velocity-time graph is a",
        "options": ["horizontal line", "straight line with slope", "parabola", "circle"],
        "answer": 1,
        "explanation": "Constant acceleration ⇒ linear v-t graph."
    },
    {
        "question": "Which equation represents uniform motion?",
        "options": ["v = u + at", "s = ut", "v² = u² + 2as", "s = ut + ½at²"],
        "answer": 1,
        "explanation": "s = ut (when a=0) describes uniform motion."
    },
    {
        "question": "Which equation of motion does not contain displacement?",
        "options": ["v = u + at", "s = ut + ½at²", "v² = u² + 2as", "s = vt - ½at²"],
        "answer": 0,
        "explanation": "v = u + at relates v, u, a, t without s."
    },
    {
        "question": "A body thrown vertically upward has maximum height when",
        "options": ["velocity is maximum", "velocity is zero", "acceleration is zero", "displacement is zero"],
        "answer": 1,
        "explanation": "At highest point, vertical velocity = 0 before descending."
    },
    {
        "question": "The acceleration due to gravity on earth is approximately",
        "options": ["9.8 m/s", "9.8 m/s²", "9.8 m", "98 m/s²"],
        "answer": 1,
        "explanation": "g = 9.8 m/s² near Earth's surface."
    },
    {
        "question": "A body is said to be in free fall when",
        "options": ["it moves upward", "it moves under gravity alone", "it has constant velocity", "it has no acceleration"],
        "answer": 1,
        "explanation": "Free fall: only gravity acts (neglecting air resistance)."
    },
    {
        "question": "The time taken for a body thrown upward to reach maximum height equals the time to",
        "options": ["reach halfway", "fall back to the same level", "double the height", "reach the ground from any height"],
        "answer": 1,
        "explanation": "Time up = time down to same level (symmetry of projectile motion)."
    },
    {
        "question": "Projectile motion is an example of motion in",
        "options": ["one dimension", "two dimensions", "three dimensions", "zero dimension"],
        "answer": 1,
        "explanation": "Projectiles move in a vertical plane (2D: horizontal & vertical)."
    },
    {
        "question": "At the highest point of a projectile motion, the vertical component of velocity is",
        "options": ["maximum", "zero", "equal to horizontal component", "negative"],
        "answer": 1,
        "explanation": "At apex, vy = 0 (changing from upward to downward)."
    },
    {
        "question": "The horizontal component of projectile motion remains",
        "options": ["zero", "constant", "increasing", "decreasing"],
        "answer": 1,
        "explanation": "No horizontal force ⇒ constant vx (ignoring air resistance)."
    },
    {
        "question": "The path of a projectile is a",
        "options": ["straight line", "parabola", "circle", "ellipse"],
        "answer": 1,
        "explanation": "Under constant g, trajectory is parabolic."
    },
    {
        "question": "A vector quantity has both",
        "options": ["speed and distance", "magnitude and direction", "length and width", "mass and weight"],
        "answer": 1,
        "explanation": "Vectors require magnitude and direction."
    },
    {
        "question": "Two vectors are equal if they have the same",
        "options": ["magnitude only", "direction only", "magnitude and direction", "position"],
        "answer": 2,
        "explanation": "Vectors are equal if both magnitude and direction match."
    },
    {
        "question": "The resultant of two parallel vectors acting in the same direction is",
        "options": ["their difference", "their sum", "zero", "their product"],
        "answer": 1,
        "explanation": "Parallel same direction: add magnitudes."
    },
    {
        "question": "The resultant of two equal and opposite vectors is",
        "options": ["twice the magnitude", "half the magnitude", "zero", "same as original"],
        "answer": 2,
        "explanation": "Equal magnitude, opposite direction ⇒ cancel to zero."
    },
    {
        "question": "A vector can be resolved into how many perpendicular components?",
        "options": ["one", "two", "three", "four"],
        "answer": 1,
        "explanation": "In 2D: two perpendicular components (x & y). In 3D: three."
    },
    {
        "question": "The dot product of two perpendicular vectors is",
        "options": ["maximum", "zero", "one", "negative"],
        "answer": 1,
        "explanation": "A·B = |A||B|cos90° = 0."
    },
    {
        "question": "Newton's first law is also known as the law of",
        "options": ["acceleration", "inertia", "action and reaction", "gravitation"],
        "answer": 1,
        "explanation": "First law describes inertia: objects resist changes in motion."
    },
    {
        "question": "Newton's second law states that force is proportional to",
        "options": ["velocity", "acceleration", "displacement", "momentum"],
        "answer": 1,
        "explanation": "F = ma ⇒ force ∝ acceleration (for constant mass)."
    },
    {
        "question": "The mathematical form of Newton's second law is",
        "options": ["F = m/a", "F = ma", "F = m + a", "F = a/m"],
        "answer": 1,
        "explanation": "F = ma is the fundamental relationship."
    },
    {
        "question": "Inertia is the tendency of a body to resist change in its state of",
        "options": ["position", "rest or motion", "shape", "temperature"],
        "answer": 1,
        "explanation": "Inertia resists changes in velocity (rest or uniform motion)."
    },
    {
        "question": "Mass is a measure of",
        "options": ["weight", "inertia", "force", "acceleration"],
        "answer": 1,
        "explanation": "Mass quantifies inertia (resistance to acceleration)."
    },
    {
        "question": "The weight of a body is",
        "options": ["constant everywhere", "varies with location", "independent of gravity", "always zero"],
        "answer": 1,
        "explanation": "Weight = mg, depends on local g value."
    },
    {
        "question": "On the moon, your mass would be ___ on Earth",
        "options": ["less than", "the same as", "greater than", "zero compared to"],
        "answer": 1,
        "explanation": "Mass is intrinsic property, weight changes but mass stays same."
    },
    {
        "question": "If the net force on an object is zero, the object is",
        "options": ["accelerating", "in equilibrium", "falling", "rotating"],
        "answer": 1,
        "explanation": "ΣF = 0 ⇒ equilibrium (either at rest or constant velocity)."
    },
    {
        "question": "Static friction acts when there is",
        "options": ["motion", "no relative motion", "acceleration", "high speed"],
        "answer": 1,
        "explanation": "Static friction prevents STARTING motion between surfaces."
    },
    {
        "question": "Kinetic friction is ___ than static friction",
        "options": ["greater", "less", "equal to", "not related to"],
        "answer": 1,
        "explanation": "μk < μs typically (easier to keep moving than to start moving)."
    },
    {
        "question": "Friction always acts ___ to the direction of motion",
        "options": ["parallel", "opposite", "perpendicular", "at 45 degrees"],
        "answer": 1,
        "explanation": "Friction opposes relative motion or its tendency."
    },
    {
        "question": "Rolling friction is ___ than sliding friction",
        "options": ["greater", "less", "equal to", "independent of"],
        "answer": 1,
        "explanation": "Rolling resistance is typically much smaller than sliding friction."
    },
    {
        "question": "The normal force acts ___ to the surface",
        "options": ["parallel", "perpendicular", "at an angle", "tangential"],
        "answer": 1,
        "explanation": "Normal force is perpendicular to contact surface."
    },
    {
        "question": "When a body slides down an inclined plane, the component of weight parallel to the plane is",
        "options": ["mg", "mg sin θ", "mg cos θ", "mg tan θ"],
        "answer": 1,
        "explanation": "Parallel component = mg sinθ causes acceleration down incline."
    },
    {
        "question": "The component of weight perpendicular to an inclined plane is",
        "options": ["mg sin θ", "mg cos θ", "mg tan θ", "mg"],
        "answer": 1,
        "explanation": "Perpendicular component = mg cosθ balances normal force."
    },
    {
        "question": "Momentum is defined as the product of",
        "options": ["mass and velocity", "mass and acceleration", "force and time", "force and distance"],
        "answer": 0,
        "explanation": "p = mv"
    },
    {
        "question": "The SI unit of momentum is",
        "options": ["kg m/s", "kg m/s²", "N s", "both A and C"],
        "answer": 3,
        "explanation": "kg·m/s = N·s (both equivalent)."
    },
    {
        "question": "The law of conservation of momentum states that total momentum is conserved in",
        "options": ["open system", "closed system", "all systems", "no system"],
        "answer": 1,
        "explanation": "Momentum conserved in isolated/closed systems (no external force)."
    },
    {
        "question": "Impulse is equal to change in",
        "options": ["velocity", "momentum", "acceleration", "force"],
        "answer": 1,
        "explanation": "Impulse = FΔt = Δp"
    },
    {
        "question": "Impulse is also equal to",
        "options": ["force × distance", "force × time", "mass × velocity", "mass × acceleration"],
        "answer": 1,
        "explanation": "J = ∫F dt ≈ FavgΔt"
    },
    {
        "question": "In an elastic collision, both momentum and ___ are conserved",
        "options": ["velocity", "kinetic energy", "potential energy", "force"],
        "answer": 1,
        "explanation": "Elastic: both momentum AND kinetic energy conserved."
    },
    {
        "question": "In an inelastic collision, ___ is not conserved",
        "options": ["momentum", "kinetic energy", "mass", "charge"],
        "answer": 1,
        "explanation": "Inelastic: momentum conserved, but KE is not (converts to other forms)."
    },
    {
        "question": "When two bodies collide and stick together, the collision is",
        "options": ["elastic", "perfectly inelastic", "partially elastic", "super elastic"],
        "answer": 1,
        "explanation": "Perfectly inelastic: maximum KE loss, objects stick together."
    },
    {
        "question": "Work is said to be done when",
        "options": ["force is applied", "displacement occurs in direction of force", "body is at rest", "force is perpendicular to displacement"],
        "answer": 1,
        "explanation": "W = F·d = Fd cosθ, nonzero when component of force in direction of displacement."
    },
    {
        "question": "The SI unit of work is",
        "options": ["Newton", "Joule", "Watt", "Pascal"],
        "answer": 1,
        "explanation": "1 J = 1 N·m"
    },
    {
        "question": "Work done is maximum when the angle between force and displacement is",
        "options": ["0°", "45°", "90°", "180°"],
        "answer": 0,
        "explanation": "cos0° = 1 ⇒ maximum work."
    },
    {
        "question": "Work done is zero when force is ___ to displacement",
        "options": ["parallel", "perpendicular", "opposite", "at 45°"],
        "answer": 1,
        "explanation": "cos90° = 0 ⇒ zero work."
    },
    {
        "question": "Energy is defined as the capacity to do",
        "options": ["force", "work", "power", "motion"],
        "answer": 1,
        "explanation": "Energy = ability to perform work."
    },
    {
        "question": "Kinetic energy depends on",
        "options": ["position", "mass and velocity", "height", "temperature"],
        "answer": 1,
        "explanation": "KE = ½mv²"
    },
    {
        "question": "The kinetic energy of a body of mass m moving with velocity v is",
        "options": ["mv", "½mv²", "mv²", "2mv"],
        "answer": 1,
        "explanation": "KE = ½mv²"
    },
    {
        "question": "Potential energy depends on",
        "options": ["velocity", "position or configuration", "acceleration", "momentum"],
        "answer": 1,
        "explanation": "PE depends on position in a force field (gravity, spring, etc.)."
    },
    {
        "question": "Gravitational potential energy at height h is",
        "options": ["mh", "mgh", "mg/h", "mh/g"],
        "answer": 1,
        "explanation": "PEgravity = mgh (relative to reference point)."
    },
    {
        "question": "The law of conservation of energy states that energy can neither be created nor",
        "options": ["used", "destroyed", "transferred", "measured"],
        "answer": 1,
        "explanation": "Energy transforms between forms but total remains constant."
    },
    {
        "question": "Power is defined as the rate of doing",
        "options": ["force", "work", "energy", "momentum"],
        "answer": 1,
        "explanation": "P = dW/dt"
    },
    {
        "question": "The SI unit of power is",
        "options": ["Joule", "Newton", "Watt", "Pascal"],
        "answer": 2,
        "explanation": "1 W = 1 J/s"
    },
    {
        "question": "1 horsepower is approximately equal to",
        "options": ["746 watts", "1000 watts", "500 watts", "100 watts"],
        "answer": 0,
        "explanation": "1 hp ≈ 746 W"
    },
    {
        "question": "Efficiency of a machine is always",
        "options": ["greater than 100%", "equal to 100%", "less than 100%", "zero"],
        "answer": 2,
        "explanation": "Efficiency = useful output/input < 1 due to losses."
    },
    {
        "question": "A reference frame is a coordinate system used to",
        "options": ["measure force", "describe position and motion", "calculate energy", "determine mass"],
        "answer": 1,
        "explanation": "Reference frame defines coordinate system for measuring position, velocity, etc."
    },
    {
        "question": "An inertial reference frame is one that moves with",
        "options": ["acceleration", "constant velocity or at rest", "variable velocity", "circular motion"],
        "answer": 1,
        "explanation": "Inertial frame: no acceleration (constant velocity or rest)."
    },
    {
        "question": "Galilean transformation relates measurements in two reference frames moving with",
        "options": ["acceleration", "constant relative velocity", "variable velocity", "zero velocity"],
        "answer": 1,
        "explanation": "Galilean transformation for frames in uniform relative motion."
    },
    {
        "question": "According to Galilean relativity, the laws of mechanics are the same in all",
        "options": ["accelerated frames", "inertial frames", "rotating frames", "non-inertial frames"],
        "answer": 1,
        "explanation": "Galilean principle: physics same in all inertial frames."
    },
    {
        "question": "Newton's laws are valid in",
        "options": ["non-inertial frames only", "inertial frames", "all frames", "no frames"],
        "answer": 1,
        "explanation": "Newton's laws hold only in inertial reference frames."
    },
    {
        "question": "The principle of relativity states that physical laws are the same in all",
        "options": ["accelerating frames", "inertial reference frames", "rotating frames", "stationary frames only"],
        "answer": 1,
        "explanation": "Einstein extended this to include electromagnetism."
    },
    {
        "question": "The speed of light in vacuum is approximately",
        "options": ["3 × 10⁶ m/s", "3 × 10⁸ m/s", "3 × 10¹⁰ m/s", "3 × 10⁴ m/s"],
        "answer": 1,
        "explanation": "c ≈ 3×10⁸ m/s = 300,000 km/s"
    },
    {
        "question": "According to special relativity, the speed of light is",
        "options": ["variable in all frames", "constant in all inertial frames", "depends on the source", "infinite"],
        "answer": 1,
        "explanation": "Postulate of special relativity: c is invariant in all inertial frames."
    },
    {
        "question": "Time dilation means that moving clocks run",
        "options": ["faster", "slower", "at the same rate", "backwards"],
        "answer": 1,
        "explanation": "Time dilation: moving clocks tick slower as measured by stationary observer."
    },
    {
        "question": "Length contraction occurs in the direction",
        "options": ["perpendicular to motion", "parallel to motion", "at 45° to motion", "in all directions equally"],
        "answer": 1,
        "explanation": "Length contraction only in direction of motion."
    },
    {
        "question": "At speeds much less than the speed of light, relativistic effects are",
        "options": ["very large", "negligible", "infinite", "zero"],
        "answer": 1,
        "explanation": "For v << c, relativity reduces to classical mechanics."
    },
    {
        "question": "The universal gravitational constant G has the unit",
        "options": ["N m²/kg²", "N m/kg", "N/kg²", "N m²/kg"],
        "answer": 0,
        "explanation": "From F = Gm₁m₂/r² ⇒ G = Fr²/m₁m₂ has units N·m²/kg²."
    },
    {
        "question": "Newton's law of universal gravitation states that gravitational force is proportional to",
        "options": ["sum of masses", "product of masses", "difference of masses", "ratio of masses"],
        "answer": 1,
        "explanation": "F ∝ m₁m₂"
    },
    {
        "question": "Gravitational force is inversely proportional to",
        "options": ["distance", "square of distance", "cube of distance", "square root of distance"],
        "answer": 1,
        "explanation": "F ∝ 1/r² (inverse square law)."
    },
    {
        "question": "The gravitational force between two bodies is always",
        "options": ["repulsive", "attractive", "zero", "variable"],
        "answer": 1,
        "explanation": "Gravity is always attractive (unlike electric charge which can be repulsive)."
    },
    {
        "question": "If the distance between two masses is doubled, the gravitational force becomes",
        "options": ["double", "one-fourth", "half", "four times"],
        "answer": 1,
        "explanation": "F ∝ 1/r² ⇒ if r×2, F÷4"
    },
    {
        "question": "Gravitational field strength at a point is defined as force per unit",
        "options": ["area", "mass", "volume", "distance"],
        "answer": 1,
        "explanation": "g = F/m (N/kg = m/s²)"
    },
    {
        "question": "The acceleration due to gravity at Earth's surface is approximately",
        "options": ["9.8 m/s", "9.8 m/s²", "98 m/s²", "0.98 m/s²"],
        "answer": 1,
        "explanation": "g ≈ 9.8 m/s²"
    },
    {
        "question": "Weight of a body is given by",
        "options": ["mg", "m/g", "g/m", "m + g"],
        "answer": 0,
        "explanation": "Weight W = mg"
    },
    {
        "question": "At the center of Earth, the value of acceleration due to gravity is",
        "options": ["maximum", "zero", "9.8 m/s²", "infinite"],
        "answer": 1,
        "explanation": "At center, net gravitational pull from all directions cancels ⇒ g=0."
    },
    {
        "question": "As we go above the Earth's surface, the value of g",
        "options": ["increases", "decreases", "remains constant", "becomes zero"],
        "answer": 1,
        "explanation": "g ∝ 1/r² decreases with altitude."
    },
    {
        "question": "The orbital velocity of a satellite depends on",
        "options": ["mass of satellite", "radius of orbit", "shape of satellite", "color of satellite"],
        "answer": 1,
        "explanation": "vₒᵣᵦ = √(GM/r) independent of satellite mass."
    },
    {
        "question": "A satellite revolving close to Earth's surface has a period of approximately",
        "options": ["24 hours", "90 minutes", "1 hour", "12 hours"],
        "answer": 1,
        "explanation": "Low Earth orbit period ≈ 90 min."
    },
    {
        "question": "Escape velocity is the minimum velocity required to",
        "options": ["orbit Earth", "escape Earth's gravitational field", "reach the moon", "land on Earth"],
        "answer": 1,
        "explanation": "Escape velocity: overcome gravity without further propulsion."
    },
    {
        "question": "Escape velocity from Earth's surface is approximately",
        "options": ["7.9 km/s", "11.2 km/s", "15 km/s", "20 km/s"],
        "answer": 1,
        "explanation": "Earth's escape velocity ≈ 11.2 km/s."
    },
    {
        "question": "A geostationary satellite has an orbital period of",
        "options": ["12 hours", "24 hours", "48 hours", "1 hour"],
        "answer": 1,
        "explanation": "Geostationary: matches Earth's rotation period (24 hr)."
    },
    {
        "question": "Work done by a force is positive when the angle between force and displacement is",
        "options": ["90°", "less than 90°", "greater than 90°", "180°"],
        "answer": 1,
        "explanation": "Positive work: force component in direction of motion (θ < 90°)."
    },
    {
        "question": "Work done by a force is negative when the angle between force and displacement is",
        "options": ["0°", "greater than 90°", "less than 90°", "equal to 90°"],
        "answer": 1,
        "explanation": "Negative work: force opposes motion (θ > 90°, cosθ negative)."
    },
    {
        "question": "Work done against friction is converted into",
        "options": ["kinetic energy", "heat energy", "potential energy", "chemical energy"],
        "answer": 1,
        "explanation": "Friction converts mechanical energy to thermal energy (heat)."
    },
    {
        "question": "The work-energy theorem states that work done equals change in",
        "options": ["potential energy", "kinetic energy", "total energy", "momentum"],
        "answer": 1,
        "explanation": "Wₙₑₜ = ΔKE"
    },
    {
        "question": "Conservative forces are those for which work done depends only on",
        "options": ["path taken", "initial and final positions", "time taken", "speed"],
        "answer": 1,
        "explanation": "Conservative force: work independent of path, depends only on endpoints."
    },
    {
        "question": "Gravitational force is an example of",
        "options": ["non-conservative force", "conservative force", "fictitious force", "contact force"],
        "answer": 1,
        "explanation": "Gravity is conservative (path independent)."
    },
    {
        "question": "Friction is an example of",
        "options": ["conservative force", "non-conservative force", "gravitational force", "electromagnetic force"],
        "answer": 1,
        "explanation": "Friction is non-conservative (path dependent, dissipative)."
    },
    {
        "question": "Mechanical energy is the sum of kinetic energy and",
        "options": ["heat energy", "potential energy", "chemical energy", "nuclear energy"],
        "answer": 1,
        "explanation": "E_mech = KE + PE"
    },
    {
        "question": "In the absence of non-conservative forces, mechanical energy is",
        "options": ["increasing", "conserved", "decreasing", "zero"],
        "answer": 1,
        "explanation": "With only conservative forces: ΔKE + ΔPE = 0 ⇒ E_mech constant."
    },
    {
        "question": "When a body falls freely, its potential energy is converted into",
        "options": ["heat energy", "kinetic energy", "chemical energy", "light energy"],
        "answer": 1,
        "explanation": "PE decreases, KE increases (energy conserved)."
    },
    {
        "question": "At the highest point of a projectile, kinetic energy is",
        "options": ["maximum", "minimum", "zero", "negative"],
        "answer": 1,
        "explanation": "At apex: vy=0, but vx≠0, so KE = ½mvx² (minimum but not zero)."
    },
    {
        "question": "The dimension of force is",
        "options": ["MLT⁻¹", "MLT⁻²", "ML²T⁻²", "MLT"],
        "answer": 1,
        "explanation": "[F] = [ma] = M×(L/T²) = MLT⁻²"
    },
    {
        "question": "The dimension of work is",
        "options": ["MLT⁻¹", "MLT⁻²", "ML²T⁻²", "ML²T⁻¹"],
        "answer": 2,
        "explanation": "[W] = [Fd] = (MLT⁻²)×L = ML²T⁻²"
    },
    {
        "question": "The dimension of power is",
        "options": ["ML²T⁻²", "ML²T⁻³", "MLT⁻²", "MLT⁻³"],
        "answer": 1,
        "explanation": "[P] = [W/t] = ML²T⁻²/T = ML²T⁻³"
    },
    {
        "question": "Which of the following pairs has the same dimensions?",
        "options": ["Force and pressure", "Work and energy", "Velocity and acceleration", "Mass and weight"],
        "answer": 1,
        "explanation": "Work and energy both have dimensions ML²T⁻²."
    },
    {
        "question": "1 Newton is equal to",
        "options": ["1 kg m/s", "1 kg m/s²", "1 kg/m s²", "1 kg m²/s"],
        "answer": 1,
        "explanation": "1 N = 1 kg·m/s²"
    },
    {
        "question": "1 Joule is equal to",
        "options": ["1 N/m", "1 N m", "1 N m²", "1 N/m²"],
        "answer": 1,
        "explanation": "1 J = 1 N·m"
    },
    {
        "question": "Dimensional analysis can be used to",
        "options": ["derive exact equations", "check correctness of equations", "find numerical values", "prove theories"],
        "answer": 1,
        "explanation": "Main use: verify equation consistency, derive relationships up to dimensionless constants."
    },
    {
        "question": "The principle of homogeneity states that in a correct equation, dimensions on both sides must be",
        "options": ["different", "same", "zero", "infinite"],
        "answer": 1,
        "explanation": "Dimensional homogeneity: LHS and RHS must have identical dimensions."
    },
    {
        "question": "Average velocity is defined as total displacement divided by",
        "options": ["distance", "total time", "speed", "acceleration"],
        "answer": 1,
        "explanation": "v_avg = Δx/Δt"
    },
    {
        "question": "Average speed is defined as total distance divided by",
        "options": ["displacement", "total time", "velocity", "acceleration"],
        "answer": 1,
        "explanation": "speed_avg = total distance / total time"
    },
    {
        "question": "Instantaneous velocity is the velocity at a",
        "options": ["long time", "particular instant", "average time", "final moment"],
        "answer": 1,
        "explanation": "v = dx/dt (limit as Δt→0)"
    },
    {
        "question": "Average acceleration is defined as change in velocity divided by",
        "options": ["distance", "time interval", "displacement", "speed"],
        "answer": 1,
        "explanation": "a_avg = Δv/Δt"
    },
    {
        "question": "When velocity is constant, acceleration is",
        "options": ["maximum", "zero", "minimum", "negative"],
        "answer": 1,
        "explanation": "Constant v ⇒ a = dv/dt = 0"
    },
    {
        "question": "Retardation means",
        "options": ["positive acceleration", "negative acceleration", "zero acceleration", "constant velocity"],
        "answer": 1,
        "explanation": "Retardation/deceleration: acceleration opposite to velocity (negative if velocity positive)."
    },
    {
        "question": "Convert 72 km/h to m/s",
        "options": ["10 m/s", "15 m/s", "20 m/s", "25 m/s"],
        "answer": 2,
        "explanation": "72 km/h = 72 × (1000 m)/(3600 s) = 72 × (5/18) = 20 m/s"
    },
    {
        "question": "A train accelerates uniformly from rest at 2 m/s². What distance does it cover in 5 s?",
        "options": ["10 m", "20 m", "25 m", "50 m"],
        "answer": 2,
        "explanation": "s = ut + ½at² = 0 + ½×2×5² = 25 m"
    },
    {
        "question": "A body moving with initial velocity 5 m/s accelerates uniformly at 3 m/s² for 4 s. What is its final velocity?",
        "options": ["12 m/s", "15 m/s", "17 m/s", "20 m/s"],
        "answer": 2,
        "explanation": "v = u + at = 5 + 3×4 = 17 m/s"
    },
    {
        "question": "The slope of a displacement–time graph represents",
        "options": ["acceleration", "velocity", "force", "momentum"],
        "answer": 1,
        "explanation": "dx/dt = velocity"
    },
    {
        "question": "A car travels 300 m in 15 s. What is its speed?",
        "options": ["15 m/s", "18 m/s", "20 m/s", "25 m/s"],
        "answer": 2,
        "explanation": "v = d/t = 300/15 = 20 m/s"
    },
    {
        "question": "A stone is dropped from rest. How far does it fall in 2 s? (g = 10 m/s²)",
        "options": ["10 m", "15 m", "20 m", "40 m"],
        "answer": 2,
        "explanation": "s = ut + ½gt² = 0 + ½×10×2² = 20 m"
    },
    {
        "question": "The velocity of a body changes from 20 m/s to 10 m/s in 5 s. What is its acceleration?",
        "options": ["–1 m/s²", "–2 m/s²", "2 m/s²", "5 m/s²"],
        "answer": 0,
        "explanation": "a = (v-u)/t = (10-20)/5 = -2 m/s² (deceleration)"
    },
    {
        "question": "Which quantity has both magnitude and direction?",
        "options": ["distance", "speed", "energy", "displacement"],
        "answer": 3,
        "explanation": "Displacement is a vector; others are scalars."
    },
    {
        "question": "Two vectors of 5 N act in opposite directions. The resultant force is",
        "options": ["0 N", "5 N", "10 N", "25 N"],
        "answer": 0,
        "explanation": "5 N left + 5 N right = 0 N"
    },
    {
        "question": "A force of 12 N produces an acceleration of 3 m/s². What is the mass of the body?",
        "options": ["2 kg", "3 kg", "4 kg", "6 kg"],
        "answer": 2,
        "explanation": "m = F/a = 12/3 = 4 kg"
    },
    {
        "question": "Which of the following is a scalar quantity?",
        "options": ["force", "velocity", "momentum", "energy"],
        "answer": 3,
        "explanation": "Energy is scalar; others are vectors."
    },
    {
        "question": "A body of mass 10 kg experiences a frictional force of 5 N. What is the resulting acceleration?",
        "options": ["0.2 m/s²", "0.5 m/s²", "2 m/s²", "5 m/s²"],
        "answer": 1,
        "explanation": "Assume no other forces: a = F/m = 5/10 = 0.5 m/s²"
    },
    {
        "question": "The momentum of a body of mass 4 kg moving at 8 m/s is",
        "options": ["12 kg m/s", "24 kg m/s", "32 kg m/s", "64 kg m/s"],
        "answer": 2,
        "explanation": "p = mv = 4×8 = 32 kg·m/s"
    },
    {
        "question": "Which of the following remains constant in an isolated system?",
        "options": ["velocity", "acceleration", "momentum", "force"],
        "answer": 2,
        "explanation": "Conservation of momentum in isolated systems."
    },
    {
        "question": "A force of 15 N moves a body through 4 m in the direction of the force. The work done is",
        "options": ["19 J", "30 J", "60 J", "120 J"],
        "answer": 2,
        "explanation": "W = Fd = 15×4 = 60 J"
    },
    {
        "question": "A machine does 600 J of work in 20 s. What is its power output?",
        "options": ["20 W", "30 W", "40 W", "60 W"],
        "answer": 1,
        "explanation": "P = W/t = 600/20 = 30 W"
    },
    {
        "question": "The kinetic energy of a body is doubled when its speed is",
        "options": ["halved", "doubled", "increased by √2", "tripled"],
        "answer": 2,
        "explanation": "KE ∝ v² ⇒ to double KE, v must increase by √2"
    },
    {
        "question": "Which of the following quantities depends on height?",
        "options": ["kinetic energy", "momentum", "potential energy", "power"],
        "answer": 2,
        "explanation": "PE = mgh depends on height h."
    },
    {
        "question": "A body of mass 2 kg is raised to a height of 5 m. What is its potential energy? (g = 10 m/s²)",
        "options": ["20 J", "50 J", "100 J", "200 J"],
        "answer": 2,
        "explanation": "PE = mgh = 2×10×5 = 100 J"
    },
    {
        "question": "A freely falling body increases its velocity by how much every second? (g = 10 m/s²)",
        "options": ["1 m/s", "5 m/s", "10 m/s", "20 m/s"],
        "answer": 2,
        "explanation": "Δv per second = g = 10 m/s²"
    },
    {
        "question": "The SI unit of acceleration is",
        "options": ["m/s", "m/s²", "N/kg", "kg m/s"],
        "answer": 1,
        "explanation": "Acceleration = m/s²"
    },
    {
        "question": "A body projected vertically upwards comes to rest at the highest point because its",
        "options": ["acceleration becomes zero", "velocity becomes zero", "force becomes zero", "mass reduces"],
        "answer": 1,
        "explanation": "At apex, v=0 momentarily before descending."
    },
    {
        "question": "Which law explains why passengers jerk forward when a car stops suddenly?",
        "options": ["Newton’s first law", "Newton’s second law", "Newton’s third law", "Law of gravitation"],
        "answer": 0,
        "explanation": "Inertia (first law): bodies tend to continue moving."
    },
    {
        "question": "The resistance to motion between two surfaces in contact is called",
        "options": ["pressure", "inertia", "friction", "thrust"],
        "answer": 2,
        "explanation": "Friction opposes relative motion."
    },
    {
        "question": "Which factor does NOT affect friction?",
        "options": ["nature of surfaces", "normal reaction", "area of contact", "roughness"],
        "answer": 2,
        "explanation": "For kinetic friction: f = μN, independent of area (for most cases)."
    },
    {
        "question": "A body of mass 1 kg moving at 10 m/s collides with a wall and rebounds with the same speed. The change in momentum is",
        "options": ["0 kg m/s", "10 kg m/s", "20 kg m/s", "–20 kg m/s"],
        "answer": 3,
        "explanation": "Δp = m(v_f - v_i) = 1×(-10 - 10) = -20 kg·m/s"
    },
    {
        "question": "Which of the following is an example of non-contact force?",
        "options": ["friction", "tension", "gravitational force", "normal reaction"],
        "answer": 2,
        "explanation": "Gravity acts at a distance; others require contact."
    },
    {
        "question": "The gravitational force between two bodies is inversely proportional to the",
        "options": ["sum of their masses", "product of their masses", "square of the distance between them", "distance between them"],
        "answer": 2,
        "explanation": "F ∝ 1/r² (inverse square law)."
    },
    {
        "question": "The area under an acceleration–time graph represents",
        "options": ["distance", "velocity", "momentum", "force"],
        "answer": 1,
        "explanation": "∫a dt = Δv"
    },
    {
        "question": "Which of the following is conserved when no external force acts?",
        "options": ["speed", "kinetic energy", "momentum", "power"],
        "answer": 2,
        "explanation": "Conservation of momentum in isolated systems."
    },
    {
        "question": "A car of mass 1000 kg moves at 20 m/s. What is its momentum?",
        "options": ["200 kg m/s", "2,000 kg m/s", "20,000 kg m/s", "200,000 kg m/s"],
        "answer": 2,
        "explanation": "p = mv = 1000×20 = 20,000 kg·m/s"
    },
    {
        "question": "The time rate of doing work is known as",
        "options": ["energy", "force", "momentum", "power"],
        "answer": 3,
        "explanation": "Power = work/time"
    },
    {
        "question": "Which quantity is the same in all inertial frames according to Galilean relativity?",
        "options": ["time", "velocity", "distance", "force"],
        "answer": 0,
        "explanation": "Classical: time is absolute, same in all frames."
    },
    {
        "question": "A body moving with uniform velocity has acceleration",
        "options": ["increasing", "decreasing", "constant", "zero"],
        "answer": 3,
        "explanation": "Uniform velocity ⇒ zero acceleration."
    },
    {
        "question": "Which of the following best defines impulse?",
        "options": ["force × time", "mass × velocity", "work ÷ time", "force ÷ mass"],
        "answer": 0,
        "explanation": "Impulse J = FΔt"
    },
    {
        "question": "The SI unit of impulse is",
        "options": ["N", "N s", "J", "kg"],
        "answer": 1,
        "explanation": "Ns = kg·m/s"
    },
    {
        "question": "Which graph best represents constant speed?",
        "options": ["horizontal velocity–time graph", "sloping velocity–time graph", "curved displacement–time graph", "vertical force–time graph"],
        "answer": 0,
        "explanation": "Constant speed ⇒ horizontal line on v-t graph."
    },
    {
        "question": "A stone of mass 0.5 kg has kinetic energy 25 J. What is its speed?",
        "options": ["5 m/s", "10 m/s", "15 m/s", "20 m/s"],
        "answer": 1,
        "explanation": "KE = ½mv² ⇒ 25 = ½×0.5×v² ⇒ v²=100 ⇒ v=10 m/s"
    },
    {
        "question": "A body of weight 100 N is lifted vertically at constant speed. The upward force applied is",
        "options": ["50 N", "100 N", "150 N", "200 N"],
        "answer": 1,
        "explanation": "Constant speed ⇒ net force=0 ⇒ upward force = weight = 100 N"
    },
    {
        "question": "Which quantity is independent of direction?",
        "options": ["velocity", "acceleration", "displacement", "mass"],
        "answer": 3,
        "explanation": "Mass is scalar; others are vectors."
    },
    {
        "question": "The unit of gravitational constant is",
        "options": ["N m² kg⁻²", "N kg² m⁻²", "kg m² s⁻²", "m s⁻²"],
        "answer": 0,
        "explanation": "G = 6.67×10⁻¹¹ N·m²/kg²"
    },
    {
        "question": "A ball is thrown vertically upwards and returns to the thrower. Ignoring air resistance, the total mechanical energy is",
        "options": ["increasing", "decreasing", "zero", "constant"],
        "answer": 3,
        "explanation": "Only conservative force (gravity) acts ⇒ mechanical energy conserved."
    },
    {
        "question": "Which of the following quantities is maximum at the highest point of a vertical motion?",
        "options": ["speed", "kinetic energy", "potential energy", "momentum"],
        "answer": 2,
        "explanation": "At highest point: PE maximum, KE minimum."
    },
    {
        "question": "The change in velocity per unit time is called",
        "options": ["speed", "displacement", "acceleration", "momentum"],
        "answer": 2,
        "explanation": "a = Δv/Δt"
    },
    {
        "question": "A force acting for a short time to change momentum is known as",
        "options": ["thrust", "impulse", "pressure", "work"],
        "answer": 1,
        "explanation": "Impulse = change in momentum."
    },
    {
        "question": "A length of 250 cm is equivalent to",
        "options": ["0.025 m", "2.5 m", "25 m", "2500 m"],
        "answer": 1,
        "explanation": "250 cm = 2.5 m (100 cm = 1 m)"
    },
    {
        "question": "If 1 km = 1000 m, how many meters are in 3.6 km?",
        "options": ["360 m", "3600 m", "36,000 m", "3,600,000 m"],
        "answer": 1,
        "explanation": "3.6 km = 3.6 × 1000 = 3600 m"
    },
    {
        "question": "A car travels 120 m in 6 s. What is its average velocity?",
        "options": ["15 m/s", "18 m/s", "20 m/s", "24 m/s"],
        "answer": 2,
        "explanation": "v_avg = d/t = 120/6 = 20 m/s"
    },
    {
        "question": "A body initially at rest accelerates uniformly at 4 m/s² for 5 s. What is its final velocity?",
        "options": ["10 m/s", "15 m/s", "20 m/s", "25 m/s"],
        "answer": 2,
        "explanation": "v = u + at = 0 + 4×5 = 20 m/s"
    },
    {
        "question": "A man pushes a wall and no motion occurs. The wall exerts a force on the man equal in magnitude but opposite in direction. This illustrates",
        "options": ["inertia", "energy conservation", "Newton’s third law", "momentum"],
        "answer": 2,
        "explanation": "Action-reaction pair: force on wall equals force on man."
    }
];