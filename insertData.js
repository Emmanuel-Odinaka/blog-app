// we use pg library to
// request connection pool from postgres database
// psql -h traineedb.cgq0reqixqsd.us-east-1.rds.amazonaws.com -d postgres -U traineeUser password is traineePassword
const { Pool } = require('pg')

// we connect to pg using pool we requested
const pool = new Pool({
  user: 'traineeUser',
  host: 'traineedb.cgq0reqixqsd.us-east-1.rds.amazonaws.com',
  password: 'traineePassword',
  database: 'postgres',
  port: 5432,
  multipleStatements: true
})

// the pool emits an error on behalf of any idle clients
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

// if no error on idel client, pool connects to database
pool.connect((err, client, done) => {
    //if there is an error with our database connection strings
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    //if no error then we have successfully connected
    console.log('Connected to database');
    // do not call done(); - because we want to use this connection
    // to create/insert/delete or select records from our database
    // sometime we might also want to export this connection for other resources
});

// insert a record into our table
pool.query(
    `INSERT INTO UserOdinaka
                 (ID, FIELDS, DATA_TYPES, SAMPLE_DATA)
                 VALUES
                 ('1', 'FirstName', 'Text', 'Odinaka'),
                 ('2', 'LastName', 'Text', 'Emmanuel'),
                 ('3', 'Email', 'Email', 'odinakaemmanuel007@gmail.com'),
                 ('4', 'Phone', 'Number', '07013994834'),
                 ('5', 'Birthday', 'Date', '09-14-2021'),
                 ('6', 'Location', 'Text', 'Emmodi Group'),
                 ('7', 'Permission Level', 'Text', 'Manager'),
                 ('8', 'PIN for Time Clock', 'Number', '512572'),
                 ('9', 'Payroll ID', 'Number', '1'),
                 ('10', 'Hire Date', 'Date', '01-21-2021'),
                 ('11', 'Wage Rate', 'Number', '$200'),
                 ('12', 'Wage Type', 'Text', 'Hourly'),
                 ('13', 'Role Name', 'Text', 'Developer'),
                 ('14', 'Account Status', 'Text', 'Signed In')
                 `,
    (err, res) => {
      if(err) {
        console.log('Error or issue with table creation');
    } else {
        console.log('Inserted data into table successfully')
        console.log(res);
   }
  }
);

pool.end();


// export connection
module.exports = pool;