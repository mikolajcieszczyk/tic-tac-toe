var playerOneName;
var playerTwoName;

$(document).ready(function() {

    var playground = $('.col-4');
    var square = $('.square');
    var winner = $('.winner');
    var whoIsNow = $('.which-player');
    var gameEndCommunicate = $('.game-end');
    var oneMoreTime = $('.one-more-time');
    var resetBtn = $('.reset-btn');
    var player = Math.floor((Math.random() * 2) + 1);
    var popup = $('#myModal');

    // POPUP SHOW

    popup.modal('show');

    // SUBMITTING NAMES AND VALIDATING FORM

    var submitBtn = $('#name-form #submit-id').on('click', function() {
        playerOneName = $("#name-form #name").val();
        playerTwoName = $("#name-form #name1").val();

        if ((playerOneName == "" || playerOneName == " ") || (playerTwoName == "" || playerTwoName == " ")) {
            if ((playerOneName == "" || playerOneName == " ") && (playerTwoName == "" || playerTwoName == " ")) {
                $("#name-form #name, #name-form #name1").css('background', 'red').attr("title", "Please insert vaild player name");
            } else if ((playerOneName == "" || playerOneName == " ")) {
                $("#name-form #name").css('background', 'red').attr("title", "Please insert vaild player name");
            } else if ((playerTwoName == "" || playerTwoName == " ")) {
                $("#name-form #name1").css('background', 'red').attr("title", "Please insert vaild player name");
            }
        } else {
            popup.modal('hide');

            whoIsNow.text(whichPlayer(player) + ' begins the game').addClass('make-things-bigger');
        }

        $("#name-form #name, #name-form #name1").on('keypress', function() {
            $(this).css('background', '#e86523').removeAttr('title');
        });
    });

    // PLAYGROUND ANIMATION

    square.on({
        mouseenter: function() {
            $(this).css('opacity', '0.9');
        },
        mouseleave: function() {
            $(this).css('opacity', '1');
        }
    })

    // CHECKING WHO IS PLAYING NOW

    function whichPlayer(player) {
        if (player == 1) {
            return playerOneName;
        } else if (player == 2) {
            return playerTwoName;
        }
    }

    // ADDING SIGNS, LISTENING IF SOMEBODY WINS, ADDING THINGS AFTER WIN

    square.on('click', function(event) {
        var squareSelected = $(this);

        if (squareSelected.hasClass('fa fa-times fa-4x') || squareSelected.hasClass('fa fa-circle fa-4x')) {
            alert('already clicked');
        } else {
            if (player === 1) {
                squareSelected.addClass('fa fa-times fa-4x');

                whoIsNow.text('Now ' + playerTwoName + "'s turn").addClass('text-animation');

                if (checkIfPlayerWon('fa fa-times fa-4x')) {
                    winner.html('<b>Congratulations!&nbsp;</b><br>' + playerOneName + '<b> is the winner! ' + '<i class="fa fa-smile-o"></i>').addClass('make-things-bigger').fadeToggle('slow');
                    whoIsNow.addClass('zero-opacity');
                    gameEndCommunicate.html('<b>THE GAME IS OVER!</b><p>').addClass('make-things-bigger').fadeToggle('slow');
                    oneMoreTime.fadeToggle('slow');
                    resetBtn.addClass('btn btn-danger').fadeIn('slow');
                    playground.addClass('playground-disable');

                } else {
                    player = 2;
                }

            } else {
                squareSelected.addClass('fa fa-circle fa-4x');

                whoIsNow.text('Now ' + playerOneName + "'s turn").css('animation', 'title-animation 2s ease 0s infinite normal');
                if (checkIfPlayerWon('fa fa-circle fa-4x')) {
                    winner.html('<b>Congratulations!&nbsp;</b>' + playerTwoName + '<b> is the winner</b>').addClass('make-things-bigger').fadeToggle('slow');
                    whoIsNow.addClass('zero-opacity');
                    gameEndCommunicate.html('<b>The game is over!</b>').addClass('make-things-bigger').fadeToggle('slow');
                    oneMoreTime.fadeToggle('slow');
                    resetBtn.addClass('btn btn-danger').fadeIn('slow');
                    playground.addClass('playground-disable');

                } else {
                    player = 1;
                }
            }
        }
    });

    // CHECKING IF SOMEBODY WIN FUNCTION

    function checkIfPlayerWon(sign) {
        if ($('.sq1').hasClass(sign) && $('.sq2').hasClass(sign) && $('.sq3').hasClass(sign)) {
            return true;
        } else if (($('.sq4').hasClass(sign) && $('.sq5').hasClass(sign) && $('.sq6').hasClass(sign))) {
            return true;
        } else if (($('.sq7').hasClass(sign) && $('.sq8').hasClass(sign) && $('.sq9').hasClass(sign))) {
            return true;
        } else if (($('.sq1').hasClass(sign) && $('.sq4').hasClass(sign) && $('.sq7').hasClass(sign))) {
            return true;
        } else if (($('.sq2').hasClass(sign) && $('.sq5').hasClass(sign) && $('.sq8').hasClass(sign))) {
            return true;
        } else if (($('.sq3').hasClass(sign) && $('.sq6').hasClass(sign) && $('.sq9').hasClass(sign))) {
            return true;
        } else if (($('.sq1').hasClass(sign) && $('.sq5').hasClass(sign) && $('.sq9').hasClass(sign))) {
            return true;
        } else if (($('.sq3').hasClass(sign) && $('.sq5').hasClass(sign) && $('.sq7').hasClass(sign))) {
            return true;
        } else {
            return false;
        }
    }

    // RESET BTN

    resetBtn.on('click', function() {
        $('.square').removeClass('.fa fa-circle fa fa-times fa-4x');
        winner.fadeOut('slow').addClass('out-of-display');
        gameEndCommunicate.fadeOut('slow').addClass('out-of-display');
        playground.removeClass('playground-disable');
        oneMoreTime.fadeOut('slow');
        $(this).fadeOut('slow');

        player = Math.floor((Math.random() * 2) + 1);

        whoIsNow.fadeOut('slow').text(whichPlayer(player) + " starts the next one").removeClass('zero-opacity');
    })


});