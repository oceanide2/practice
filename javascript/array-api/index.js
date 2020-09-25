class Student {
  constructor(name, age, enrolled, score) {
    this.name = name
    this.age = age
    this.enrolled = enrolled
    this.score = score
  }
}

const students = [
  new Student('A', 29, true, 45),
  new Student('B', 28, false, 80),
  new Student('C', 30, true, 90),
  new Student('D', 40, false, 66),
  new Student('E', 18, true, 88),
]

// find a student with the score 90
{
  const result = students.find((student) => student.score === 90)
  console.log(result)
}

// make an array of enrolled students
{
  const result = students.filter((student) => student.enrolled)
  console.log(result)
}

// make an array containing only the students' scores
{
  const result = students.map((student) => student.score)
  console.log(result)
}

// check if there is a student with the score lower than 50
{
  const result = students.some((student) => student.score < 50)
  console.log(result)
}

// compute students' average score
{
  const result =
    students.reduce((sum, student) => (sum += student.score), 0) /
    students.length
  console.log(result)
}

// make a string containing all the scores
// result should be: '45, 80, 90, 66, 88'
{
  const result = students.map((student) => student.score).join(', ')
  console.log(result)
}
