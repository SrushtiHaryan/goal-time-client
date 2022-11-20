const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const server2 = require("../server2");
const expect = require('chai').expect;

const Timer = require("../controllers/Timer")
const timer = new Timer();

const UserProfile = require('../controllers/UserProfile')
const userProfile = new UserProfile();

//assertion-style
chai.should();

chai.use(chaiHttp);


describe('GoalTime Testing', () => {

    const pomodoroSession1 =
    {
        titlepomo: "Reading",
        startdate: "2022-11-10",
        enddate: "2022-11-14",
        starttime: "10:30",
        durationPomo: 7,
        durationBreak: 2,
        numsession: 2,
        numrepetition: 1,
        isGoog: true
    }

    const pomodoroSession2 =
    {
        titlepomo: "Sleeping",
        startdate: "2022-11-14",
        enddate: "2022-11-20",
        starttime: "20:00",
        durationPomo: 2,
        durationBreak: 1,
        numsession: 2,
        numrepetition: 1,
        isGoog: true
    }

    const pomodoroSession3 =
    {
        titlepomo: "Competitive Coding",
        startdate: "2022-11-7",
        enddate: "2022-11-8",
        starttime: "17:30",
        durationPomo: 2,
        durationBreak: 1,
        numsession: 2,
        numrepetition: 1,
        isGoog: true
    }


    const pomodoroSession4 =
    {
        titlepomo: "Walking",
        startdate: "2022-11-14",
        enddate: "2022-11-03",
        starttime: "11:",
        durationPomo: 1,
        durationBreak: 2,
        numsession: 6,
        numrepetition: 2,
        isGoog: false
    }


    describe("\nPomodoro Configuration Unit Test 1:", function () {

        describe("User Google Auth Check Test Case 1", function () {

            it("Test Case 1: The user has logged in with Google", function () {

                var isGoogleUser = timer.pomodoroUserGoogle(pomodoroSession1);
                expect(isGoogleUser).to.equal(true);

            });

        });

        
        describe("User Google Auth Check Test Case 2", function () {

            it("Test Case 2: The user has logged in with Google", function () {

                var isGoogleUser = timer.pomodoroUserGoogle(pomodoroSession2);
                expect(isGoogleUser).to.equal(true);

            });

        });

        
        describe("User Google Auth Check Test Case 3", function () {

            it("Test Case 3: The user has logged in with Google", function () {

                var isGoogleUser = timer.pomodoroUserGoogle(pomodoroSession3);
                expect(isGoogleUser).to.equal(true);

            });

        });

        
        describe("User Google Auth Check Test Case 4", function () {

            it("Test Case 4: The user has logged in with Google", function () {

                var isGoogleUser = timer.pomodoroUserGoogle(pomodoroSession4);
                expect(isGoogleUser).to.equal(true);

            });

        });


        // var isGoogleUser = timer.pomodoroUserGoogle(pomodoroSession1);
        // expect(isGoogleUser).to.equal(true);

        // it("Test Case 2: The user has logged in with Google", function () {


        //     var isGoogleUser = timer.pomodoroUserGoogle(pomodoroSession2);
        //     expect(isGoogleUser).to.equal(true);

        //     var isGoogleUser = timer.pomodoroUserGoogle(pomodoroSession3);
        //     expect(isGoogleUser).to.equal(true);

        //     var isGoogleUser = timer.pomodoroUserGoogle(pomodoroSession4);
        //     expect(isGoogleUser).to.equal(true);

        // });

    });

        describe("\nPomodoro Configuration Unit Test 2:", function () {


            describe("Date Check Test Case 1", function () {


                it("Test Case 1: The end date is after the start date", function () {

                    var isValidDate = timer.pomodoroDateCheck(pomodoroSession1);
                    expect(isValidDate).to.equal(true);

                });

            });


            describe("Date Check Test Case 2", function () {


                it("Test Case 2: The end date is after the start date", function () {

                    var isValidDate = timer.pomodoroDateCheck(pomodoroSession2);
                    expect(isValidDate).to.equal(true);

                });

            });
            describe("Date Check Test Case 3", function () {


                it("Test Case 3: The end date is after the start date", function () {

                    var isValidDate = timer.pomodoroDateCheck(pomodoroSession3);
                    expect(isValidDate).to.equal(true);

                });

            });
            describe("Date Check Test Case 4", function () {


                it("Test Case 4: The end date is after the start date", function () {

                    var isValidDate = timer.pomodoroDateCheck(pomodoroSession4);
                    expect(isValidDate).to.equal(true);

                });

            });


        });


        describe("\nPomodoro Configuration Unit Test 3:", function () {


            describe("Pomo v/s Break Test Case 1", function () {
               

                it("Test Case 1: The pomodoro duration is greater than break", function () {

                    var isValidPomo = timer.pomodoroGreaterThanBreak(pomodoroSession1);
                    expect(isValidPomo).to.equal(true);


                });

            });

            describe("Pomo v/s Break Test Case 2", function () {
               

                it("Test Case 2: The pomodoro duration is greater than break", function () {

                    var isValidPomo = timer.pomodoroGreaterThanBreak(pomodoroSession2);
                    expect(isValidPomo).to.equal(true);


                });

            });

            describe("Pomo v/s Break Test Case 3", function () {
               

                it("Test Case 3: The pomodoro duration is greater than break", function () {

                    var isValidPomo = timer.pomodoroGreaterThanBreak(pomodoroSession3);
                    expect(isValidPomo).to.equal(true);


                });

            });

            describe("Pomo v/s Break Test Case 4", function () {
               

                it("Test Case 4: The pomodoro duration is greater than break", function () {

                    var isValidPomo = timer.pomodoroGreaterThanBreak(pomodoroSession4);
                    expect(isValidPomo).to.equal(true);


                });

            });

       
    });


    describe("\nPomodoro Consistency Unit Test 4:", function () {

        const User1 = {
            name: "Srushti Haryan",
            email: "srushti.haryan@spit.ac.in",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfTWHYvPk2Q8NwG4nLcKb4YJ5N50zSY_1Szzkgu-Of3JKIpIXZJCvd5nQzdXztoFc8Sl8&usqp=CAU",
            isGoogle: true,
            pomoCo: 3,
            pomoCr: 5,
            pomoF: 2
        }

        const User2 = {
            name: "Manushree Dubey",
            email: "manushree.dubey@spit.ac.in",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfTWHYvPk2Q8NwG4nLcKb4YJ5N50zSY_1Szzkgu-Of3JKIpIXZJCvd5nQzdXztoFc8Sl8&usqp=CAU",
            isGoogle: true,
            pomoCo: 2,
            pomoCr: 2,
            pomoF: 0
        }

        const User3 = {
            name: "Alan Mathews",
            email: "alan.mathews@act.ac.in",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfTWHYvPk2Q8NwG4nLcKb4YJ5N50zSY_1Szzkgu-Of3JKIpIXZJCvd5nQzdXztoFc8Sl8&usqp=CAU",
            isGoogle: true,
            pomoCo: 4,
            pomoCr: 8,
            pomoF: 4
        }

        const User4 = {
            name: "John Doe",
            email: "john.doe@spit.ac.in",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfTWHYvPk2Q8NwG4nLcKb4YJ5N50zSY_1Szzkgu-Of3JKIpIXZJCvd5nQzdXztoFc8Sl8&usqp=CAU",
            isGoogle: true,
            pomoCo: 3,
            pomoCr: 10,
            pomoF: 5
        }


        describe("Pomodoro Data consistency Test Case 1", function () {
               

            it("Completed + Failed = Created", function () {

                var totalCheck = userProfile.consistencyPomodoroCount(User1);
                expect(totalCheck).to.equal(User1.pomoCr);


            });

        });


        describe("Pomodoro Data consistency Test Case 2", function () {
               

            it("Completed + Failed = Created", function () {

                var totalCheck = userProfile.consistencyPomodoroCount(User2);
                expect(totalCheck).to.equal(User2.pomoCr);


            });

        });


        describe("Pomodoro Data consistency Test Case 3", function () {
               

            it("Completed + Failed = Created", function () {

                var totalCheck = userProfile.consistencyPomodoroCount(User3);
                expect(totalCheck).to.equal(User3.pomoCr);


            });

        });


        describe("Pomodoro Data consistency Test Case 4", function () {
               

            it("Completed + Failed = Created", function () {

                var totalCheck = userProfile.consistencyPomodoroCount(User4);
                expect(totalCheck).to.equal(User4.pomoCr);


            });

        });

    });



});
