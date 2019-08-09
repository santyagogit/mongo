const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground', {useNewUrlParser: true})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'Angular Course',
    author: 'Sams',
    tags: ['angular', 'frontend'],
    isPublished: true
  });
  
  const result = await course.save();
  console.log(result);  
}

async function getCourses() {
  const courses = await Course
    .find({author: 'Sams', isPublished: true})
    // .find({ $gte: 10, $lte: 20 })
    // .find({ price: { $in: [10, 15, 20] } })
    // .find()
    // .or([{author: 'Sams'}, {isPublished: true}])
    // .and([{author: 'Sams', isPublished: true}])
    // .find({author: /^Sams/})
    // .find({ author: /Sams$/i })
    // .find({ author: /.*Sams.*/i })
    .limit(10)
    .sort({name: 1})
    // .select({name: 1, tags: 1});
    .countDocuments();
  console.log(courses);
}

getCourses();