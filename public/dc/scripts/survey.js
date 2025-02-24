$(document).ready(function() {
    // Hide survey elements initially
    $('.page-survey').hide();
    $('.quiz').hide();
    $('.quiz .question:not(:first)').hide();
    $('.analizer').hide();
    $('.congratulation').hide();

    // Form submission handler
    $(".form [data-question='3'] .btn").off('click').on('click', function(e) {
        e.preventDefault();
        phoneValidation();
        
        if (isPhoneValid()) {
            $("html, body").animate({ scrollTop: 0 }, 300);
            $('.page-main').fadeOut(300);
            setTimeout(() => {
                $('.page-survey').fadeIn(300);
            }, 300);
        }
    });

    // Welcome screen handler
    $('.welcome .answers .btn').click(function() {
        $('.welcome').fadeOut(300);
        setTimeout(() => {
            $('.progress').css('opacity', '1');
            $('.quiz').fadeIn(300);
            $('.quiz .question:first').fadeIn(300);
        }, 300);
    });

    // Survey question navigation
    $('.quiz .question .answers .btn').click(function() {
        let currentQuestion = $(this).closest('.question');
        let nextQuestion = currentQuestion.next('.question');
        let questionNumber = currentQuestion.data('question');
        
        // Update progress indicator
        $(`.progress .circle-container:eq(${questionNumber-1})`).addClass('checked');
        if (nextQuestion.length) {
            $(`.progress .line-container:eq(${questionNumber-1})`).addClass('checked');
            $(`.progress .circle-container:eq(${questionNumber})`).addClass('active');
        }
        
        currentQuestion.fadeOut(300);
        
        if (nextQuestion.length) {
            setTimeout(() => {
                nextQuestion.fadeIn(300);
            }, 300);
        } else {
            $('.quiz').fadeOut(300);
            setTimeout(() => {
                $('.analizer').fadeIn(300);
                setTimeout(() => {
                    $('.progress').css('opacity', '0');
                    $('.analizer').fadeOut(300);
                    setTimeout(() => {
                        $('.congratulation').fadeIn(300);
                    }, 300);
                }, 2000);
            }, 300);
        }
    });

    // Final offer button handler
    $('#offer_link').click(function(e) {
        e.preventDefault();
        const currentTime = new Date().getTime();
        
        if (currentTime - lastClickTime < 5000) {
            return false;
        }
        
        window.location.href = `${$(this).attr("href")}${$(this).attr("href").includes("?") ? "&" : "?"}clickid=${rtkClickID}&rtkck=${cachebuster}&sub12=${$("[name=zip]").val()}&sub13=${$("[name=firstname]").val()}&sub14=${$("[name=lastname]").val()}&sub15=${$("[name=email]").val()}&sub16=${$("[name=phone]").val().replaceAll("(", "").replaceAll(")", "").replaceAll(" ", "").replaceAll("-", "")}&offer_type=Product Reviewer`;
    });

    setTimeout(()=>{
        $(".welcome").fadeOut(300)
        setTimeout(()=>{
            $('header').css("opacity" , "1")
            $('.progress').css("opacity" , "1")
            $('.quiz').fadeIn(300)
            $("body").css("background-color" , "#fff")
        },300)
    },3000)
    
    $(".question[data-question='1'] .answers .btn").click(function(){
        $(".progress .line-container:eq(0)").addClass("active")
        $(".question[data-question='1']").fadeOut(300)
        setTimeout(()=>{
            $(".progress .circle-container:eq(1)").addClass("active")
            $(".question[data-question='2']").fadeIn(300)
        },300)
    })

    
    $(".question[data-question='2'] .answers .btn").click(function(){
        $(".progress .line-container:eq(1)").addClass("active")
        $(".question[data-question='2']").fadeOut(300)
        setTimeout(()=>{
            $(".progress .circle-container:eq(2)").addClass("active")
            $(".question[data-question='3']").fadeIn(300)
        },300)
    })

    $(".question[data-question='2'] .back button").click(function(){
        $(".progress .circle-container:eq(1)").removeClass("active")
        $(".question[data-question='2']").fadeOut(300)
        setTimeout(()=>{
            $(".progress .line-container:eq(0)").removeClass("active")
            $(".question[data-question='1']").fadeIn(300)
        },300)
    })

    $(".question[data-question='3'] .answers .btn").click(function(){
        $(".question[data-question='3']").fadeOut(300)
        $('.quiz').fadeOut(300)
        setTimeout(()=>{
            $('.analizer').fadeIn(300)
            setTimeout(()=>{
                $(".progress .circle-container:eq(0)").addClass("checked")
                setTimeout(()=>{
                    $(".progress .line-container:eq(0)").addClass("checked")
                    setTimeout(()=>{
                        $(".progress .circle-container:eq(1)").addClass("checked")
                        setTimeout(()=>{
                            $(".progress .line-container:eq(1)").addClass("checked")
                            setTimeout(()=>{
                                $(".progress .circle-container:eq(2)").addClass("checked")
                                setTimeout(()=>{
                                    $(".progress").css("opacity" , "0")
                                    $(".analizer").fadeOut(300)
                                    $(".quiz").fadeOut(300)
                                    setTimeout(()=>{
                                        $(".progress").css("margin-bottom", "0")
                                        $(".congratulation").fadeIn(300)
                                    },300)
                                },1500)
                            },300)
                        },300)
                    },300)
                },300)
            },300)
        },300)
    })

    $(".question[data-question='3'] .back button").click(function(){
        $(".progress .circle-container:eq(2)").removeClass("active")
        $(".question[data-question='3']").fadeOut(300)
        setTimeout(()=>{
            $(".progress .line-container:eq(1)").removeClass("active")
            $(".question[data-question='2']").fadeIn(300)
        },300)
    })
    
    const sub12 = window.getURLParameter(window.location.href, 'sub12');
    const sub13 = window.getURLParameter(window.location.href, 'sub13');
    const sub14 = window.getURLParameter(window.location.href, 'sub14');
    const sub15 = window.getURLParameter(window.location.href, 'sub15');
    const sub16 = window.getURLParameter(window.location.href, 'sub16');
    
    const offer_type = window.getURLParameter(window.location.href, 'offer_type');
    
    const rtkClickID__ = window.getURLParameter(window.location.href, 'clickid');
    const cachebuster__ = window.getURLParameter(window.location.href, 'rtkck');
    
    const data = {
        "zip": sub12, 
        "firstname": sub13, 
        "lastname": sub14, 
        "email": sub15, 
        "phone": sub16, 
        "offer_type": offer_type, 
        "offer_url": window.location.href.split('?')[0].replace("/survey/" , "").replace("/survey" , ""), 
        "click_id": rtkClickID__
    };
    if (rtkClickID__ && cachebuster__) {
        if (rtkClickID__ !== "undefined" && cachebuster__ !== "undefined") {
            fetch(`https://track.${window.location.host}/postback?type=CompleteRegistration&clickid=${rtkClickID__}`, { mode: 'no-cors'})
            .then(r => {
                console.log("successfully registered: " + rtkClickID__);
                fetch("https://data.omniatrackroi.com/api/leads", { method: "POST", mode: "no-cors", body: JSON.stringify(data) })
                .then(rr => {
                    console.log("successfully registered lead in Data API: " + rtkClickID__)
                })
                .catch(ed => {});
            })
            .catch(e => console.log("error during registration lead: " + e));
        }
    }


    window.offer_link = `https://track.${window.location.host}/click`
    window.offer_final_link = `${offer_link}${offer_link.includes("?") ? "&" : "?"}clickid=${rtkClickID__}&rtkck=${cachebuster__}&sub12=${sub12}&sub13=${sub13}&sub14=${sub14}&sub15=${sub15}&sub16=${sub16}`
    $("#offer_link").attr("href" , offer_final_link)
    
    document.getElementById('showSurvey').addEventListener('click', function() {
        // Fade out main page
        document.querySelector('.page-main').classList.add('fade-out');
        
        // Show and fade in survey page with welcome screen
        const surveyPage = document.querySelector('.page-survey');
        const welcomeScreen = document.querySelector('.welcome');
        
        // Reset any previously hidden elements
        $('.quiz').hide();
        $('.analizer').hide();
        $('.congratulation').hide();
        welcomeScreen.style.display = 'block';
        
        // Show survey page
        surveyPage.style.display = 'block';
        void surveyPage.offsetWidth;
        
        // Add active class to trigger fade in
        setTimeout(() => {
            surveyPage.classList.add('active');
        }, 50);
    });
})