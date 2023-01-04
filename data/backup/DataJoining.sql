CREATE TABLE crime_1 (
NUM INT(6),
Region VARCHAR(1000) NOT NULL,
Year_ VARCHAR(1000) NOT NULL,
Series VARCHAR(1000),
Value_ VARCHAR(1000),
Footnotes_ VARCHAR(1000),
Source_ VARCHAR(1000)
);

LOAD DATA LOCAL INFILE '/Users/esha/Downloads/crime_1.csv' 
INTO TABLE crime_1 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' LINES 
TERMINATED BY '\n' ;

SET SQL_SAFE_UPDATES = 0;

ALTER TABLE crime_1 ADD Gender VARCHAR(1000);
UPDATE crime_1
SET Gender= CASE
   WHEN Series like "%, Male" THEN "M"
   WHEN Series like "%, Female" THEN "F"
   ELSE "Combined"
END;


Select * from crime_1;

CREATE TABLE education_1 (
NUM INT(6),
Region VARCHAR(1000) NOT NULL,
Year_ VARCHAR(1000) NOT NULL,
Series VARCHAR(1000),
Value_ VARCHAR(1000),
Footnotes_ VARCHAR(1000),
Source_ VARCHAR(1000)
);

LOAD DATA LOCAL INFILE '/Users/esha/Downloads/education_1.csv' 
INTO TABLE education_1 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' LINES 
TERMINATED BY '\n' ;

ALTER TABLE education_1 ADD Gender VARCHAR(1000);
UPDATE education_1
SET Gender= CASE
   WHEN Series like "%(male)" THEN "M"
   WHEN Series like "%(female)" THEN "F"
   ELSE "Combined"
END;

Select * from education_1;

CREATE TABLE CrimeAndEducation
SELECT C.Region AS Region, C.Year_ AS Year, C.Value_ as CrimeRate, E.Value_ as EducationRate, C.Series As CrimeInfo, E.Series as EducationInfo, E.Gender AS Gender
FROM crime_1 C
Left Join education_1 E ON C.Year_ = E.Year_ and C.Region = E.Region and C.Gender = E.Gender;

Select * from CrimeAndEducation