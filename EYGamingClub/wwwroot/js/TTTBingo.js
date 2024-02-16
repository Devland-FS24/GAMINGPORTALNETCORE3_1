    $(document).ready(function () {
            //getgamestatus();
        $('body').addClass('bd_Default');
        $('#dvGeneralRegistration').show();
    });




//GLOBAL LIST OF ANALYZED POTENTIAL WINNERS
//WORKAROUND FOR PROPERLY DETERMINE WHETHER THERE ARE WINNERS FOR THIS ROUND
var winnersthisround = "";

//***************** SKIN SETTINGS **************************
//************ STATIC HTML CONTROLS ****************************
var lscontrols = new Array(
                "btnExitPlayer",
                "dvPlayersReadyPlayer",
                "dvYourCard",
                "dvBingoCard",
                "tbPlayerNickname",
                "div3Player",
                "h3QuestionTextPlayer",
                "htmrNextQuestion",
                "hWaitingNQ",
                "hNumberPlayers",
                "btnGotBingo",
                "btnGotLine",
                "spBtnBingoTimer",
                "spBtnLineTimer",
                "hCheckResults",
                "hCurQuestion",
                "btnContinuePlayer",
                "btnLeavePlayer",
                "btnPlayerWonBingo",
                "modNexWinnersFromAdminContainer"
                );
//************ END STATIC HTML CONTROLS ****************************

//************ _Default THEME ***************************************

var lsclass_Default = new Array(
            'button_Default',
            'dvDialog_Default',
            'dvDialog_Default',
            'dvCardContainer_Default',
            'alignright_Default',
            'dv3Player_Default',
            'hPlyQuestion_Default',
            'timerplyrNextQ_Default',
            'hWaitNextQ_Default',
            'center2_Default',
            'btnGotBingo_Default',
            'btnGotBingo_Default',
            'spanBtnTimer_Default',
            'spanBtnTimer_Default',
            'chkWaitResults_Default',
            'N/A',
            'button_Default',
            'button_Default',
            'button_Default',
            'modBackColorNWinner_Default'
            );
//************ END _Default THEME ***************************************

//************ CORPORATE THEME ***************************************

var lsclass_Corp = new Array(
            'button_Corp',
            'dvDialog_Corp',
            'dvDialog_Corp',
            'dvCardContainer_Corp',
            'alignright_Corp',
            'dv3Player_Corp',
            'hPlyQuestion_Corp',
            'timerplyrNextQ_Corp',
            'hWaitNextQ_Corp',
            'center2_Corp',
            'btnGotBingo_Corp',
            'btnGotBingo_Corp',
            'spanBtnTimer_Corp',
            'spanBtnTimer_Corp',
            'chkWaitResults_Corp',
            'hCurQ_Corp',
            'button_Corp',
            'button_Corp',
            'button_Corp',
            'modBackColorNWinner_Corp'
                    );
//************ CORPORATE THEME ***************************************
//**************** END SKIN SETTINGS *********************


//**************** GLOBAL DYNAMIC CLASS FOR SELECTED ITEMS ********

//A TIMER, IN ORDER TO GIVE IT TIME TO REFRESH
//AND GET THE CURRENT SKIN TO APPLY FOR SELECTED/UNSELECTED CELLS.
var unselectedcell;
var selectedcell;
setcelltoselectstatic();



//************ END GLOBAL DYNAMIC CLASS FOR SELECTED ITEMS ********


//************ GLOBAL TIMERS *****************************
        var timer3;
        var timerhidecurquestion23;
        var timerbtnsec23;
        var timerwinner;
        var timerGetNextQPlayer;
        var timerCheckReqSkinChange;
        var timerPlayersCount;
        var arrprizeclaims;
        var globalarraypositioncheckedcard;
        var officialquestionsls;



        $('#on').click(function () {
            $('#spGameMode').text(" Line");
            $('#spGameMode').removeClass("spanGameStatusOFF");
            $('#spGameMode').addClass("spanGameStatusON");

            //CONFIRM: This will create a new Bingo round on LINE mode. Continue? 
            var bingomode;
            var confirmMsg = "WARNING: This will create a new Bingo round on LINE mode. Continue?";
            var funcname = "ConfirmStart";
            ConfirmDialogBingo(bingomode, funcname, confirmMsg);
        });

        $('#off').click(function () {
            $('#spGameMode').text(" Bingo");
            $('#spGameMode').removeClass("spanGameStatusOFF");
            $('#spGameMode').addClass("spanGameStatusON");

            //CONFIRM: This will create a new Bingo round on BINGO mode. Continue? 
            var bingomode;
            var confirmMsg = "WARNING: This will create a new Bingo round on BINGO mode. Continue?";
            var funcname = "ConfirmStart";
            ConfirmDialogBingo(bingomode, funcname, confirmMsg);
        });

        //function getgamestatus() {

        //    var currentquestionId = "";

        //    $.ajax({
        //            url: "/TTTBingo/IsGameOn",
        //            xhrFields: {withCredentials: true },
        //            crossDomain: true,
        //            data: {
        //                    gamestatus: currentquestionId
        //                   },
        //            type: "POST",
        //            dataType: "json",
        //            success: function (result, status, xhr)
        //            {

        //                var resultFromServer = xhr.getResponseHeader("PlayerGameStatus");

        //                if (resultFromServer == "GameIsOFF") {

        //                    $('#dvNotAllowed').hide();                            
        //                    $('#dvInitialLoading').hide();                           
        //                    $('body').addClass('bd_Default');
        //                    $('#dvGeneralRegistration').show();
        //                }
        //                else {

        //                    if (resultFromServer == "GameNotStarted") {
        //                        $('#dvGeneralRegistration').hide();
        //                        $('#dvNotAllowed').hide();
        //                        $('#dvTooEarly').show();
        //                    }
        //                    else {
        //                            $('#dvGeneralRegistration').hide();
        //                            $('#dvTooEarly').hide();
        //                            $('#dvNotAllowed').show();
        //                    }


        //                }

        //            },
        //            error: function (XMLHttpRequest, textStatus, errorThrown) {
        //                //alert('Unexpected error: ' + 'Code: getgamestatus' + ' Status: ' + textStatus + ' .Details: ' + errorThrown);
        //            }
        //    });

        //}


        function refreshqtable() {

        $.ajax({
            url: "/TTTBingo/RefreshQTable",
            cache: false,
            data: {
                dummy: 1

            },
            type: "GET",
            dataType: "json",
            success: function (result, status, xhr) {


            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //alert('Unexpected error: ' + 'Code: refreshqtable' + ' Status: ' + textStatus + " .Details: " + errorThrown);
            }
        });
}

        // Change the selector if needed
        var $table = $('table.scroll'),
            $bodyCells = $table.find('tbody tr:first').children(),
            colWidth;

        // Adjust the width of thead cells when window resizes
        $(window).resize(function () {
        // Get the tbody columns width array
        colWidth = $bodyCells.map(function () {
            return $(this).width();
        }).get();

            // Set the width of thead columns
                    $table.find('thead tr').children().each(function (i, v) {
                $(v).width(colWidth[i]);
        });
        }).resize(); // Trigger resize handler

        function SpinThatWheelADMIN(secadmin1) {
        
                var timerADMIN = setInterval(function () {
                $('#div2 span').text(secadmin1--);
                if (secadmin1 == -1)
                {
                    $('#div2').fadeOut('fast');
                        clearInterval(timerADMIN);
                        timerADMIN = undefined;
                    $('#dvPlayersMonitor').hide();
                    $('#btnNextQuestion').hide();

                    //Displays Next Question(in the ADMIN panel)
                    $('#div3').show();

                    //Displays Waiting sign
                    $('#dvWinnerContainer').show();


                    //Update questions, displays random question
                    //Empties GameEvent table
                    //Inserts generated question in the nextquestion column in GameEvent
                    //So the player can get it
                    updatequestionlist();



                }
            }, 1000);
        }

        function SpinThatWheelPlayer(sec) {
           var timerPlayer = setInterval(function () {
              $('#div2 span').text(sec--);

              if (sec == -1) {
                $('#div2').fadeOut('fast');
                  clearInterval(timerPlayer);
                  timerPlayer = undefined;
                //Displays Next Question
                $('#div3Player').show();

              


                //Update questions, displays random question
                getnextquestionevent();

              }
            }, 1000);
        }

        function refreshplayersmon(monsec, gameidsession) {
            var timerRefreshMon = setInterval(function () {
                monsec--;

                if (monsec == -1) {
                    clearInterval(timerRefreshMon);
                    timerRefreshMon = undefined;
                    playersmonitor(gameidsession);
                }
            }, 1000);
        }



        function getplayerscount(countsec, currentgamesessionid) {
             timerPlayersCount = setInterval(function () {
                countsec--;
                if (countsec == -1) {
              
                    playerscount(currentgamesessionid);
                }
            }, 1000);
        }

        function timerhidebtn(btnvalue,timerbtnsec) {


            timerbtnsec23 = setInterval(function () {

                if (btnvalue =="btnline") {
                    $('#spBtnLineTimer').text(timerbtnsec--);
                }
                else {
                    if (btnvalue == "btnbingo") {
                        $('#spBtnBingoTimer').text(timerbtnsec--);
                    }

                }               


                if (timerbtnsec == -1) {

                    if (btnvalue == "btnline") {
                       
                        $('#spBtnLineTimer').fadeOut('fast');
                        $('#btnGotLine').hide();

                    }
                    else {
                        if (btnvalue == "btnbingo") {

                            $('#spBtnBingoTimer').fadeOut('fast');
                            $('#btnGotBingo').hide();

                        }

                    } 
                    clearInterval(timerbtnsec23);
                    timerbtnsec23 = undefined;
                    $('#spBtnLineTimer').text('');
                    $('#spBtnBingoTimer').text('');
                    $('#spBtnLineTimer').hide();
                    $('#spBtnBingoTimer').hide();

                }
              
            }, 1000);
        }


        function checkforpotentialwinners() {

            var sessionidgameplayer = $('#hdnGameSessionIDplayer').val();
        

            $.ajax({
                url: "/TTTBingo/GetWinner",
                xhrFields: { withCredentials: true },
                crossDomain: true,
                data: {
                    cursessionidgame: sessionidgameplayer
                },
                type: "GET",
                dataType: "json",
                success: function (result, status, xhr) {

                 

                    var resultFromServer = xhr.getResponseHeader("WinnerResults");

                    //console.log(' RESULT FROM WINNERS TABLE: ' + resultFromServer);

                    if (resultFromServer == "Nowinners") {
                        
                        $('#div3Player').fadeOut('fast');

                        clearInterval(timerhidecurquestion23);
                        timerhidecurquestion23 = undefined;

                        //HIDE BUTTON(LINE OR BINGO)
                        $('#btnGotLine').hide();
                        $('#btnGotBingo').hide();
                        $('#trResultsCheck').hide();

                        //CALL WAITING FOR THE NEXT QUESTION
                        activatenextq();

                       

                        var countsectimerhidecur = 1;
                        getplayerscount(countsectimerhidecur, sessionidgameplayer);
                                             
                    }                    
                   
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert('Unexpected error: ' + 'Code: checkforwinners' + ' Status: ' + textStatus + " .Details: " + errorThrown);
                }
            });
        }



        function timerhidecurquestion(timercurquestionsec) {

          
            //CALL WAITING FOR RESULTS FROM ADMIN
            $('#trResultsCheck').show();



             timerhidecurquestion23 = setInterval(function () {

                $('#div3Player span').text(timercurquestionsec--);

                 if (timercurquestionsec < 190) {

                     //CHECK WHETHER THERE ARE POTENTIAL WINNERS
                     //SINCE THERE ARE NO POTENTIAL WINNERS, THE COUNTDOWN GETS INTERRUPTED
                     //IN ORDER TO LISTEN FOR THE NEXT QUESTION.
                     checkforpotentialwinners();

                 }

                 //console.log(' TIMER STATUS: ' + timercurquestionsec);

                if (timercurquestionsec == -1) {
            
                    $('#div3Player').fadeOut('fast');
                    clearInterval(timerhidecurquestion23);
                    timerhidecurquestion23 = undefined;
                    //HIDE BUTTON(LINE OR BINGO)
                    $('#btnGotLine').hide();
                    $('#btnGotBingo').hide();
                    $('#trResultsCheck').hide();

                    //CALL WAITING FOR THE NEXT QUESTION
                    //console.log('KEPT ACTIVATING AFTER 11 NOWINNERSORERRORS.FAILED TO STOP TIMER 240.');
                    activatenextq();


                    var countsectimerhidecur = 1;
                    getplayerscount(countsectimerhidecur);

                }
                else {
          
                    //WHILE WAITING FOR RESULTS
                    //CALL CHECK FOR RESULTS(EVERY 1 SECOND)
                    //IF RESULTS=> SHOW WINNERS PANEL
                   
                    
                     getnextwinnerlist();
                  



                }
            }, 1000);
        }


         function hidewinnerspanel(sechidewinners1) {
             timerwinner = setInterval(function () {              
                 sechidewinners1--;
                if (sechidewinners1 == -1) {
                    $('#modNexWinnersFromAdminContainer').fadeOut('fast');
                    clearInterval(timerwinner);
                    timerwinner = undefined;
                    confetti.stop();
                    $('#div3Player').hide();


                    var countsechidewinnersp = 1;
                    getplayerscount(countsechidewinnersp);

                    //Checks for a skin change request every 1 second.
                    var checkskinrequesttimer2 = 1;
                    getbingoskinrequest(checkskinrequesttimer2); 
                }
            }, 1000);
         }

        function hidewinnerspanelBingo(sechidewinners165, winnerplayerid) {           
             timer3 = setInterval(function () {             
                 sechidewinners165--;
                 if (sechidewinners165 == -1) {
                    $('#modNexWinnersFromAdminContainer').fadeOut('fast');
                    clearInterval(timer3);
                    timer3 = undefined;
                    confetti.stop();


                    if (winnerplayerid != "Notawinner") {

                        //IF PLAYER WON THE BINGO************************************************************
                        $('#div1').hide();
                        $('#tbPlayerNickname').hide();

                        if ($('#dvGameOverPlayer').is(':visible')) {

                        }
                        else {

                            if ($('#dvGameOverOnePlayer').is(':visible')) {

                            }
                            else {
                                $('#dvGameOverPlayerWon').show();
                                removeplayer();
                            }
                        }

                        clearInterval(timerhidecurquestion23);
                        timerhidecurquestion23 = undefined;

                        clearInterval(timerwinner);
                        timerwinner = undefined;

                        clearInterval(timerGetNextQPlayer);
                        timerGetNextQPlayer = undefined;
                      //IF PLAYER WON THE BINGO************************************************************


                    }
                    else {
                        //IF PLAYER DIDN'T WIN THE BINGO*************************************************
                        $('#div3Player').hide();


                        //UPDATE PLAYERS COUNT
                        var countsechidewinnersp = 1;
                        getplayerscount(countsechidewinnersp);

                        //Checks for a skin change request every 1 second.
                        var checkskinrequesttimer2 = 1;
                        getbingoskinrequest(checkskinrequesttimer2); 
                    }

                }
            }, 1000);
        }

        function getbingoskinrequest(checkskintmr,gameid) {

            timerCheckReqSkinChange = setInterval(function () {

                checkskintmr--;

                if (checkskintmr == -1) {

                    clearInterval(timerCheckReqSkinChange);
                    timerCheckReqSkinChange = undefined;
                    getskinname(gameid);
                }
            }, 1000);
        }

        function getnextqplayer(secplayer1) {

            $('#dvNextQContainer').show();
            timerGetNextQPlayer = setInterval(function ()
            {
                    secplayer1--;

                    if (secplayer1 == -1)
                    {
                        clearInterval(timerGetNextQPlayer);
                        timerGetNextQPlayer = undefined;
                        getactivationcodenextq();
                    }
            }, 1000);
        }

        function getwinner(secwinner) {

            var timerGetWinner25 = setInterval(function () {
                $('#dvWinnerContainer span').text(secwinner--);

                if (secwinner == -1) {
                    $('#dvWinnerContainer').fadeOut('fast');
                    clearInterval(timerGetWinner25);
                    timerGetWinner25 = undefined;
                    $('#div3').hide();

                    //CHECK FOR POTENTIAL WINNERS.
                    checkforwinners();
                }
            }, 1000);
        }

        $('#h1playnowButton').click(function () {
        $('#div6').hide();
    $('#div1').show();
});

        function selectmycell(controlelement)
        {
            //console.log('CONTROL NAME: ' + controlelement.id + 'CSS UNSELECTED: ' + unselectedcell + ' CSS SELECTED: ' + selectedcell);

            if ($(controlelement).hasClass(unselectedcell))
            {
                $(controlelement).removeClass(unselectedcell);
                $(controlelement).addClass(selectedcell);
            }
            else {
                $(controlelement).removeClass(selectedcell);
                $(controlelement).addClass(unselectedcell);
            }
        }


        $('#dvCell1').click(function () {
            selectmycell(this);
        });

        $('#dvCell2').click(function () {
            selectmycell(this);
        });

        $('#dvCell3').click(function () {
            selectmycell(this);
        });

        $('#dvCell4').click(function () {
            selectmycell(this);
        });

        $('#dvCell5').click(function () {
            selectmycell(this);
        });

        $('#dvCell6').click(function () {
            selectmycell(this);
        });



        function setcelltoselectstatic() {

            var himgcls2 = document.getElementById('imgBingoHeader');
            var controlclsdata3 = himgcls2.className;
            var arrclassname3 = controlclsdata3.split("_");
        
            var clstoapplybefore3 = arrclassname3[1];
            unselectedcell = "dvCell_" + clstoapplybefore3;
            selectedcell = "dv_SelectedCell_" + clstoapplybefore3;

        }




        function setprevselectedcellsdyn(tmrnewappliedclass) {

             var timernewstyleselectedcell = setInterval(function () {
                tmrnewappliedclass--;
                if (tmrnewappliedclass == -1) {

                    clearInterval(timernewstyleselectedcell);
                    timernewstyleselectedcell = undefined;

                    //APPLY NEW CSS CLASS TO PREVIOUSLY SELECTED CELL AFTER 2 seconds

                    var himgcls = document.getElementById('imgBingoHeader');
                    var controlclsdata = himgcls.className;
                    var arrclassname = controlclsdata.split("_");                 
                    var clstoapply = arrclassname[1];

                    //console.log('THIS IS CURRENT IMGHEADER CLASS: ' + clstoapply);

                    //THE CURRENT SKIN FOR CSS SELECTED CELL TO APPLY:
                    var curselectedcelltoapply = "dv_SelectedCell_" + clstoapply;

                    var dvcelleval;
                    var controlclsdata2;
                    var indexer = 0;
                    var dvids = 'dvCell';
               
                    indexer = 2;


                    //THEN, PREPARE THE CSS FOR NEW CELL SELECTIONS WITH THE CURRENT CSS
            
                    var controlclsdata4 = himgcls.className;
                    var arrclassname4 = controlclsdata4.split("_");
           
                    var newclstoapply = arrclassname4[1];
                    unselectedcell = "dvCell_" + newclstoapply;
                    selectedcell = "dv_SelectedCell_" + newclstoapply;


                    for (i = 2; i < 8; i++) {
                        indexer = i - 1;
                        var curdvcell = dvids + indexer;

                        //CURRENT CELL CONTROL NAME
                        dvcelleval = document.getElementById(curdvcell);

                        //ALL CSS CLASSES APPLIED TO THIS CELL
                        controlclsdata2 = dvcelleval.className;

                        //APPLY replace('col-sm '...) TO REMOVE col-sm, LEAVING ONLY THE NAME OF THE PREVIOUSLY APPLIED CLASS:

                        // ******* THIS IS THE PREVIOUSLY APPLIED dvCell CSS. *****
                        var ret = controlclsdata2.replace('col-sm ', '');

                        //THIS IS TO DETERMINE THE LENGHT OF THE RESULTING ARRAY
                        //2 MEANS, APPLIED CSS CELL HAS dvCell + Skin Style
                        //3 MEANS, APPLIED CSS CELL HAS dv_SelectedCell + Skin Style
                        var arrcelleval = ret.split("_");
                        var arrceevlen = arrcelleval.length;

                        var styletoremoveforcontrols;
                      

                        //console.log('Card cell number : ' + indexer + ' Applied class: ' + ret + ' array lenght: ' + arrceevlen);
                        //console.log(' Prev. applied class: ' + ret + ' CLASS TO BE APPLIED' + curselectedcelltoapply);

                        if (arrceevlen == 3) {
                            styletoremoveforcontrols = arrcelleval[2];
                            //CURRENT CELL IS PREVIOUSLY SELECTED.
                            //REMOVE THE PREVIOUSLY APPLIED CSS CLASS FOR CELL SELECTED
                            $(dvcelleval).removeClass(ret);

                            //THEN ADD THE CURRENT CSS CLASS FOR CELL SELECTED
                            $(dvcelleval).addClass(curselectedcelltoapply);
                        }
                        else {
                            styletoremoveforcontrols = arrcelleval[1];
                            //CURRENT CELL IS NOT PREVIOUSLY SELECTED.
                            //UPDATE IT TO APPLY THE NEW SELECTED STYLE.
                            $(dvcelleval).removeClass(ret);

                            $(dvcelleval).addClass(unselectedcell);
                        }


                    }


                    //SET NEW SKIN FOR THE REST OF THE CONTROLS.

                    setnewstyleforallcontrols(styletoremoveforcontrols,newclstoapply);


                }
            }, 1000);
        }

        function setnewstyleforallcontrols(previouskin, newskintoapply)
        {
            //console.log('PREV SKIN: ' + previouskin + 'NEW SKIN TO APPLY: '  + newskintoapply);



            if (previouskin != newskintoapply) {
                //LOOP TRHOUGH CONTROLS ARRAY
                //lscontrols
                //lsclass_Default
                //lsclass_Corp
                var arrcontrolslen = lscontrols.length;
                var curcontrol = '#';



                for (i = 0; i < arrcontrolslen; i++) {

                    //'#dvCell2'               
                    var controltoupd = curcontrol + lscontrols[i];

                    if (previouskin == 'Default') {
                        //console.log(' CURRENT CONTROL: ' + controltoupd + 'PREV. SKIN: ' + lsclass_Default[i] + ' NEW SKIN: ' + lsclass_Corp[i]); 

                        if (lsclass_Default[i] == 'N/A') {
                            $(controltoupd).addClass(lsclass_Corp[i]);
                        }
                        else {
                            //REMOVE PREVIOUS CLASS
                            $(controltoupd).removeClass(lsclass_Default[i]);

                            //THEN ADD THE CURRENT CSS CLASS 
                            $(controltoupd).addClass(lsclass_Corp[i]);
                        }

                    }
                    else {
                        if (previouskin == 'Corp') {
                            // console.log(' CURRENT CONTROL: ' + controltoupd + 'PREV. SKIN: ' + lsclass_Corp[i] + ' NEW SKIN: ' + lsclass_Default[i]); 

                            if (lsclass_Corp[i] == 'N/A') {
                                $(controltoupd).addClass(lsclass_Default[i]);
                            }
                            else {

                                //REMOVE PREVIOUS CLASS 
                                $(controltoupd).removeClass(lsclass_Corp[i]);

                                //THEN ADD THE CURRENT CSS CLASS 
                                $(controltoupd).addClass(lsclass_Default[i]);
                            }

                        }
                    }

                }
            }

            //console.log('' + );
            //CALL WAITING FOR THE NEXT QUESTION
            activatenextq();


        }



        $('#btnGotLine').click(function ()
        {
            var line1 = '';
            var line2 = '';
            var missingline = "NA;NA;NA";

       
            //GET STYLE TO APPLY
            var himgcls = document.getElementById('imgBingoHeader');
            var controlclsdata = himgcls.className;
            var arrclassname = controlclsdata.split("_");
            var clstoapply = arrclassname[1]; //Deafult / Corp

        
            var selecteddvcell = "dv_SelectedCell_" + clstoapply;

            //console.log('CONTROL: ' + curdvcellcontrol + ' CURRENT CELL STYLE: ' + curclsdvcell + ' STYLE TO APPLY: ' + clstoapply);



               //CHECKS WHETHER BOTH LINES WERE SELECTED
            if ($('#dvCell1').hasClass(selecteddvcell)
                && $('#dvCell2').hasClass(selecteddvcell)
                && $('#dvCell3').hasClass(selecteddvcell)
                && $('#dvCell4').hasClass(selecteddvcell)
                && $('#dvCell5').hasClass(selecteddvcell)
                && $('#dvCell6').hasClass(selecteddvcell)
            ) {
            
         
                var underanalysismsg = "You must select ONE LINE only.";
                setInformationModePlayer(underanalysismsg);

                var nofunction = "";
                $('#hdnRemoteFunctionNParam').val(nofunction);


                line1 = '';
                line2 = '';
            }
            else {
                //CHECKS WHETHER LINE 1 HAS BEEN SELECTED.
                if ($('#dvCell1').hasClass(selecteddvcell)
                    && $('#dvCell2').hasClass(selecteddvcell)
                    && $('#dvCell3').hasClass(selecteddvcell)
                ) {
                    line1 = $('#dvCell1').text() + ";" + $('#dvCell2').text() + ";" + $('#dvCell3').text() + ";";


                    //TO DO FIX: COMPLETE MISSING LINE WITH "NA" text
                    //SAMPLE:
                    //Emi;FSO;GTP;NA;NA;NA
                    line1 = line1 + ";" + missingline;


                    gotLine(line1);
                
                    $('#btnGotLine').hide();
                    $('#spBtnLineTimer').text('');
                    $('#spBtnLineTimer').hide();
        

                    clearInterval(timerbtnsec23);
                    timerbtnsec23 = undefined;

                }
                else {
                    //CHECKS WHETHER LINE 2 HAS BEEN SELECTED.
                    if ($('#dvCell4').hasClass(selecteddvcell)
                        && $('#dvCell5').hasClass(selecteddvcell)
                        && $('#dvCell6').hasClass(selecteddvcell)
                    ) {
                        line2 = $('#dvCell4').text() + ";" + $('#dvCell5').text() + ";" + $('#dvCell6').text() + ";";

                        //TO DO FIX: COMPLETE MISSING LINE WITH "NA" text
                        //SAMPLE:
                        //NA;NA;NA;Emi;FSO;GTP

                        line2 = missingline + ";" + line2;

                        gotLine(line2);
                   
                        $('#btnGotLine').hide();
                        $('#spBtnLineTimer').text('');
                        $('#spBtnLineTimer').hide();


                        clearInterval(timerbtnsec23);
                        timerbtnsec23 = undefined;
                    }
                    else {
                        //YOU MUST SELECT AT LEAST ONE LINE TO CONTINUE.
             

                        var underanalysismsg = "You have no line. Keep playing!!";
                        setInformationModePlayer(underanalysismsg);

                        var nofunction = "";
                        $('#hdnRemoteFunctionNParam').val(nofunction);

                        line1 = '';
                        line2 = '';
                    }

                }
            }

        });

        $('#btnGotBingo').click(function ()
        {

            //GET STYLE TO APPLY
            var himgcls = document.getElementById('imgBingoHeader');
            var controlclsdata = himgcls.className;
            var arrclassname = controlclsdata.split("_");
            var clstoapply = arrclassname[1]; //Deafult / Corp

            var selecteddvcell = "dv_SelectedCell_" + clstoapply;

                var bingo = "";

            if ($('#dvCell1').hasClass(selecteddvcell)
                && $('#dvCell2').hasClass(selecteddvcell)
                && $('#dvCell3').hasClass(selecteddvcell)
                && $('#dvCell4').hasClass(selecteddvcell)
                && $('#dvCell5').hasClass(selecteddvcell)
                && $('#dvCell6').hasClass(selecteddvcell)
                )
                {
                    bingo = $('#dvCell1').text() + ";";
                    bingo = bingo + $('#dvCell2').text() + ";";
                    bingo = bingo + $('#dvCell3').text() + ";";
                    bingo = bingo + $('#dvCell4').text() + ";";
                    bingo = bingo + $('#dvCell5').text() + ";";
                    bingo = bingo + $('#dvCell6').text() + ";";

                    gotBingo(bingo);
                    $('#btnGotBingo').hide();
                    $('#spBtnBingoTimer').text('');
                    $('#spBtnBingoTimer').hide();


                    clearInterval(timerbtnsec23);
                    timerbtnsec23 = undefined;

                }
                else
                {
              
                    var underanalysismsg = "You have no Bingo. Keep playing!!";
                    setInformationModePlayer(underanalysismsg);

                    var nofunction = "";
                    $('#hdnRemoteFunctionNParam').val(nofunction);
                }

        });

        $('#lnkShowDetails').click(function () {

            var arrpartialresult;
            arrpartialresult = arrprizeclaims[globalarraypositioncheckedcard].split(";");
            //EXAMPLE FOR LINE arrpartialresult:
            //2;LINE2;P361_1;2420;NA_False;NA_False;NA_False;Emi_True;Douglas_True;Monica_False

            $('#modCardDetails').show();
            $('#modRegisterWinners').hide();
            $('#CloseModPlayerCard').hide();

            if (arrpartialresult[1] == "LINE1") {
                CheckQuestionsAskedPlayer(arrpartialresult[4], arrpartialresult[5], arrpartialresult[6]);
            }
            else {
                if (arrpartialresult[1] == "LINE2") {
                    CheckQuestionsAskedPlayer(arrpartialresult[7], arrpartialresult[8], arrpartialresult[9]);
                }
                else {
                    if (arrpartialresult[1] == "BINGO") {
                        CheckQuestionsAskedPlayer("","","");
                    }
                }
            }

     
        });


//BEGIN ADMIN FUNCTIONS---------------------

        function CheckQuestionsAskedPlayer(answer1, answer2, answer3)
        {
            var answer1fromplayer = answer1;
            var answer2fromplayer = answer2;
            var answer3fromplayer = answer3;

            var cardcheckplayerId = $('#hdnCheckCardPlayerId').val();

            var gameidsess = $('#hdnGameSessionIDplayer').val();
   

            $.ajax({
                url: "/TTTBingo/CheckQuestionsAskedPlayer",
                xhrFields: { withCredentials: true },
                crossDomain: true,
                data: {
                    playercheckcurrentId: cardcheckplayerId,
                    gameid: gameidsess,
                    answertoevaluate1: answer1fromplayer,
                    answertoevaluate2: answer2fromplayer,
                    answertoevaluate3: answer3fromplayer
                },
                type: "GET",
                dataType: "json",
                success: function (result, status, xhr) {

                    var resultFromServer = xhr.getResponseHeader("CardPlayerCheckResults");

                    var arrplayercardresults = resultFromServer.split("|");
                    var arrpartialresult;
                    var arrpartialresultline;
                    var newtr_html = '';

                        $('#modCardDetails').show();
               
                    if (answer1fromplayer != "" && answer2fromplayer != "" && answer3fromplayer != "")
                    {
                        //BUILD LINE HTML
                        
                        for (var i = 0; i < 3; i++) {
                            //SO FAR, THIS SHOULD RESULT IN:
                            //WINNER LINE EXAMPLE: Pregunta5;Emi;Emi|
                            //NOT WINNER EXAMPLE:  Question not asked;---;Emi

                            arrpartialresultline = arrplayercardresults[i].split(";");

                                if (arrpartialresultline[0] !=="Question not asked") {
                                    newtr_html += '<tr class="trcustom"><td><textarea readonly>' + arrpartialresultline[0] + '</textarea></td>\
                                       <td>' + arrpartialresultline[1] + '</td>\
                                       <td style="color:white;background-color:lawngreen;font-weight:bold;">' + arrpartialresultline[2] + '</td></tr>';
                                }
                                else{
                                    newtr_html += '<tr class="trcustom"><td><textarea readonly>' + arrpartialresultline[0] + '</textarea></td>\
                                       <td>' + arrpartialresultline[1] + '</td>\
                                       <td style="color:white;background-color:red;font-weight:bold;">' + arrpartialresultline[2] + '</td></tr>';
                                }                             

                            $('#tbPlayerHits').html(newtr_html);

                        }
                    }
                    else {

                        //BUILD BINGO HTML
                        for (var i = 0; i < arrplayercardresults.length - 1; i++) {

                            arrpartialresult = arrplayercardresults[i].split(";");

                            if (arrpartialresult[1] == arrpartialresult[2]) {
                                newtr_html += '<tr class="trcustom"><td><textarea readonly>' + arrpartialresult[0] + '</textarea></td>\
                                       <td>' + arrpartialresult[1] + '</td>\
                                       <td style="color:white;background-color:lawngreen;font-weight:bold;">' + arrpartialresult[2] + '</td></tr>';
                            }
                            else {
                                newtr_html += '<tr class="trcustom"><td><textarea readonly>' + arrpartialresult[0] + '</textarea></td>\
                                       <td>' + arrpartialresult[1] + '</td>\
                                       <td style="color:white;background-color:red;font-weight:bold;">' + arrpartialresult[2] + '</td></tr>';
                            }


                            $('#tbPlayerHits').html(newtr_html);

                        }
                    }

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert('Unexpected error: ' + 'Code: checkforwinners' + ' Status: ' + textStatus + " .Details: " + errorThrown);
                }
            });
        }


        $('#CloseModPlayerCard').click(function () {           
            $('#modPlayerCard').hide();
        });


        $('#WinnersFromAdminClose').click(function () {

        $('#modNexWinnersFromAdminContainer').hide();
});

        $('#btnRegisterWinner1').click(function () {

            var fieldsOK1 = false;
            var fieldsOK2 = false;
            var fieldsOK3 = false;
            var RegWinFullName = $('#txtRegWinFullName').val();
            var RegWinEmail = $('#txtRegWinEmail').val();
            var RegWinGPN = $('#txtRegWinGPN').val();

            if (RegWinFullName != null && RegWinFullName != "") {
                fieldsOK1 = true;
                $('#txtRegWinFullName').removeClass("redBorder");
            }
            else {
             
                $('#txtRegWinFullName').val('');
                $('#txtRegWinFullName').addClass("redBorder");
                fieldsOK1 = false;
            }
            //***************

            if (RegWinEmail != null && RegWinEmail != "") {
                fieldsOK2 = true;
                $('#txtRegWinEmail').removeClass("redBorder");
            }
            else {
           
                $('#txtRegWinEmail').val('');
                $('#txtRegWinEmail').addClass("redBorder");
                fieldsOK2 = false;
            }

            //**************
            if (RegWinGPN != null && RegWinGPN != "") {
                fieldsOK3 = true;
                $('#txtRegWinGPN').removeClass("redBorder");
            }
            else {
           
                $('#txtRegWinGPN').val('');
                $('#txtRegWinGPN').addClass("redBorder");
                fieldsOK3 = false;
            }


            //***************
            if (fieldsOK1 && fieldsOK2 && fieldsOK3) {
               
                RegisterAdditionalDataPlayer();
            }
            else {
                 fieldsOK1 = false;
                 fieldsOK2 = false;
                 fieldsOK3 = false;
            }

        });


        $('#btnCreateGameSession').click(function () {

            var fieldsOK1 = false;
            var fieldsOK2 = false;
            var fieldsOK3 = false;
            var RegNewGameName = $('#txtNewGameName').val();
            var RegNewGameDescription = $('#txtNewGameDescription').val();
            var rbTypeTrivia = false;
            var rbTypeClassic = false;

            if ($("#rbTypeTrivia").is(":checked")) {
                rbTypeTrivia = true;
            }
            else if ($("#rbTypeClassic").is(":checked")) {
                rbTypeClassic = true;
            }


            if (RegNewGameName != null && RegNewGameName != "" && !/[^a-zA-Z0-9]/.test(RegNewGameName)) {
                fieldsOK1 = true;
                $('#txtNewGameName').removeClass("redBorder");
            }
            else {

                $('#txtNewGameName').val('');
                $('#txtNewGameName').addClass("redBorder");
                fieldsOK1 = false;
            }
            //***************

            if (RegNewGameDescription != null && RegNewGameDescription != "") {
                fieldsOK2 = true;
                $('#txtNewGameDescription').removeClass("redBorder");
            }
            else {

                $('#txtNewGameDescription').val('');
                $('#txtNewGameDescription').addClass("redBorder");
                fieldsOK2 = false;
            }

            //**************
            if (rbTypeTrivia || rbTypeClassic) {
                fieldsOK3 = true;
                $('#lbltrivia').removeClass("lbltriviaError");
                $('#lblclassic').removeClass("lblclassicError");
                $('#dvBingoType').removeClass("dvBingoTypeError");

                $('#lbltrivia').addClass("lbltrivia");
                $('#lblclassic').addClass("lblclassic");
                $('#dvBingoType').addClass("dvBingoType");
            }
            else {

                $('#lbltrivia').removeClass("lbltrivia");
                $('#lblclassic').removeClass("lblclassic");
                $('#dvBingoType').removeClass("dvBingoType");

                $('#lbltrivia').addClass("lbltriviaError");
                $('#lblclassic').addClass("lblclassicError");
                $('#dvBingoType').addClass("dvBingoTypeError");


                fieldsOK3 = false;
            }


            //***************
            if (fieldsOK1 && fieldsOK2 && fieldsOK3) {               

                if ($("#rbTypeClassic").is(":checked")) {
                    var noparam;
                    var confirmMsg = "WARNING: By choosing the Classic Bingo option, you automatically created 15 entries with numbers ranging from  1 to 15. You can add or remove these entries later. Are you sure to continue?";
                    var funcname = "CreateNewGameSession";
                    ConfirmDialogBingo(noparam, funcname, confirmMsg);
                }
                else if ($("#rbTypeTrivia").is(":checked")) {
                    CreateNewGameSession();
                }


            }
            else {
                fieldsOK1 = false;
                fieldsOK2 = false;
                fieldsOK3 = false;

                var blanknotallowedmsg = "Blank values and special characters are not allowed. Please review your data.";
                setInformationMode(blanknotallowedmsg);

                var nofunction = "";
                $('#hdnRemoteFunctionNParam').val(nofunction);

            }

        });


        $('#btnNotify').click(function () {
            if ($('#dvGameOverPlayer').is(':visible')) {

            }
            else {
                //HIDE BUTTON(LINE OR BINGO)
                $('#btnGotLine').hide();
                $('#btnGotBingo').hide();

                notifywinners();
        
            }

        });


        function ConfirmStart() {

            //RESET GLOBAL LIST OF ANALYZED POTENTIAL WINNERS
            //FOR THE NEW BINGO ROUND(LINE OR BINGO)
            winnersthisround = "";

            hidepopdiv();

            $('#spGameStatus').text(" ON");
            $('#spGameStatus').removeClass("spanGameStatusOFF");
            $('#spGameStatus').addClass("spanGameStatusON");
            $('#dvGameModeControls').hide();

            $('#modGameTheme').show();
        }


        //ADMIN CALLS THE NEXT RANDOM QUESTION
        $('#btnNextQuestion').click(function () {    

            $('#div2').show();
            if ($('#div2').is(':visible'))
            {
                var sec = 5;
        
                SpinThatWheelADMIN(sec);

                //Check Players Count every 1 second
                var countnextqmodule = 1;
                getplayerscount(countnextqmodule);
            }
        });



        $('#btnList').click(function () {
            $('#QClose').removeClass('QCloseAddEdit');
            $('#QClose').addClass('QClose');

            $('#tbAddEditQuestion').hide();
            $('#btnList').hide();
            $('#titEditQ').hide();
            $('#titNewQ').hide();
            $('#btnSaveQuestion').hide();

            $('#titAllQ').show();
            $('#tbQuestionsAdmin').show();
            $('#tbLQControls').show();    

            getAllQuestions();
        });


        function cleaneventypeafterwinning() {
            //console.log('CLEAN UP EVENTYPE AFTER CLICK ON CONTINUE BUTTON(LINE/BINGO).');

            var currentquestionId = "";

            $.ajax({
                url: "/TTTBingo/CleanUpEventType",
                xhrFields: { withCredentials: true },
                crossDomain: true,
                data: {
                    cleanupeventype: currentquestionId
                },
                type: "POST",
                dataType: "json",
                success: function (result, status, xhr) {

                    var resultFromServer = xhr.getResponseHeader("CleanUpEventTypeResults");
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert('Unexpected error: ' + 'Code: cleaneventypeafterwinning' + ' Status: ' + textStatus + " .Details: " + errorThrown);
                }
            });
        }


        $('#btnContinuePlayer').click(function () {

            clearInterval(timerwinner);
            timerwinner = undefined;

            confetti.stop();


            clearInterval(timerbtnsec23);
            timerbtnsec23 = undefined;

            $('#spBtnLineTimer').text('');
            $('#spBtnBingoTimer').text('');
            $('#spBtnLineTimer').hide();
            $('#spBtnBingoTimer').hide();

            $('#modNexWinnersFromAdminContainer').hide();

            //WORKAROUND: CLEAN PREVIOUS GAMEEVENTS OF TYPE 2,4.
            //SET EVENTYPE TO "999"
            cleaneventypeafterwinning();

            //SETS PLAYER TO LISTEN FOR THE NEXT QUESTION
            activatenextq();

            //HIDE BUTTON(LINE OR BINGO)
            $('#btnGotLine').hide();
            $('#btnGotBingo').hide();


            var countsecbtnContinuePlayer = 1;
            getplayerscount(countsecbtnContinuePlayer);

            //Checks for a skin change request every 1 second.
            var checkskinrequesttimer2 = 1;
            getbingoskinrequest(checkskinrequesttimer2); 
        });

        //CLOSES OFF WINNERS PANEL
        $('#btnPlayerWonBingo').click(function () {
            clearInterval(timer3);
            timer3 = undefined;
            confetti.stop();

            clearInterval(timerbtnsec23);
            timerbtnsec23 = undefined;
            $('#spBtnLineTimer').text('');
            $('#spBtnBingoTimer').text('');
            $('#spBtnLineTimer').hide();
            $('#spBtnBingoTimer').hide();

            clearInterval(timerhidecurquestion23);
            timerhidecurquestion23 = undefined;

            clearInterval(timerwinner);
            timerwinner = undefined;

            clearInterval(timerGetNextQPlayer);
            timerGetNextQPlayer = undefined;

            $('#modNexWinnersFromAdminContainer').hide();
            $('#div1').hide();
            $('#tbPlayerNickname').hide();

            if ($('#dvGameOverPlayer').is(':visible')) {
     
            }
            else {
               $('#dvGameOverPlayerWon').show();
            }
            
            removeplayer();
        });



        $('#btnLeavePlayer').click(function () {
            confetti.stop();

            clearInterval(timerbtnsec23);
            timerbtnsec23 = undefined;
            $('#spBtnLineTimer').text('');
            $('#spBtnBingoTimer').text('');
            $('#spBtnLineTimer').hide();
            $('#spBtnBingoTimer').hide();

            $('#modNexWinnersFromAdminContainer').hide();
            $('#div1').hide();
            $('#tbPlayerNickname').hide();
            $('#dvGameOverPlayer').show();


            removeplayer();
        });

        $('#btnExitPlayer').click(function () {
            confetti.stop();

            $('#modNexWinnersFromAdminContainer').hide();
            $('#div1').hide();
            $('#tbPlayerNickname').hide();

            $('#dvGameOverPlayer').show();
            removeplayer();
        });

        $('#btnQuestionsAsked').click(function () {
            var thistbodyparam = '#tbdyQuestionsAdmin';
            filterquestionstatus(thistbodyparam);
        });

        $('#mnQActivateAll').click(function () {      
            //ConfirmDialogAllQActivation();

            var noparam;
            var confirmMsg = "WARNING: Are you sure to ACTIVATE ALL the questions?";
            var funcname = "activateallquestions";
            ConfirmDialogBingo(noparam, funcname, confirmMsg);

        });

        $('#mnQDeactivateAll').click(function () {       
            //ConfirmDialogAllQDeactivated();

            var noparam;
            var confirmMsg = "WARNING: Are you sure to DEACTIVATE ALL questions?";
            var funcname = "deactivateallquestions";
            ConfirmDialogBingo(noparam, funcname, confirmMsg);
        });

        $('#btnSearchQ').click(function () {
            searchQbyText();
        });

        $('#btnNewQuestion').click(function () {

            $('#hdnQuestionToUpdate').val("0");


            //btnCreateAdminConsole
            $('#btnCreateAdminConsole').hide();

            $('#QClose').removeClass('QClose');
            $('#QClose').addClass('QCloseAddEdit');
     

            $('#inRWQuestion').val('');
            $('#inEditStatus').val('');
            $('#inRWAnswer').val('');

            $('#tbQuestionsAdmin').hide();
            $('#tbLQControls').hide();        
            $('#titAllQ').hide();
            $('#titEditQ').hide();
            $('#btnList').hide(); 


            //Shows the controls to enter a new question
            $('#tbAddEditQuestion').show();
            $('#titNewQ').show();
               
          
            $('#btnSaveQuestion').show(); 
        });

        $('#btnSaveQuestion').click(function () {
            var hdnArrGameKey2 = $('#hdnArrGameKey').val();

            var arrnewbingotype = hdnArrGameKey2.split(";");

            var newbingosesid = "";

            var questionnewid = "";


            if (arrnewbingotype[0] == "NEWGAMETRIVIA") {
                var arr2 = arrnewbingotype[1].split("_");

                newbingosesid = arr2[1];
                questionnewid = "NEWGAMETRIVIA" + ";" + newbingosesid;
            }
            else {

                 questionnewid = $('#hdnQuestionToUpdate').val();
            }
           
            addeditquestion(questionnewid);
        });


        $('#QClose').click(function () {
            $('#modQuestions').hide();
        });


        $('#WClose').click(function () {
            $('#modWinnersRegistered').hide();
        });

        $('#PClose').click(function () {
            $('#modPlayers').hide();
        });

        $('#mdCardClose').click(function () {
            $('#modCards').hide();
        });

        $('#CDetClose').click(function () {
            $('#modCardDetails').hide();
            $('#CloseModPlayerCard').show();
        });

        $('#RegWinnerClose').click(function () {
            $('#modRegisterWinners').hide();
        });


        $('#mnQuestions').click(function () {

            var gameID = $('#hdnGameSessionID').val();


            //modQuestions
            //modWinnersRegistered
            //modPlayers
            //modCards

            $('#QClose').removeClass('QCloseAddEdit'); 
            $('#QClose').addClass('QClose');

            $('#modGameOverSummary').hide();
            $('#modCards').hide();
            $('#tbAddEditQuestion').hide();
            $('#titEditQ').hide();
            $('#titNewQ').hide();
            $('#btnList').hide();
            $('#modWinnersRegistered').hide();
            $('#modPlayers').hide();    
            $('#btnSaveQuestion').hide();

            $('#modQuestions').show();
            $('#tbQuestionsAdmin').show();
            $('#tbLQControls').show();
            $('#titAllQ').show();
            $('#btnNewQuestion').show();

            getAllQuestions(gameID);

        });



        $('#mnQAsked').click(function () {
            $('#mdQuestionsasked').show();
            var qaskedtbody = '#tbdyQuestionsasked';
            filterquestionstatus(qaskedtbody)

        });


        $('#mnWinners').click(function () {

            var gameID = $('#hdnGameSessionID').val();

            //modQuestions
            //modWinnersRegistered
            //modPlayers
            //modCards

            $('#modGameOverSummary').hide();
            $('#modQuestions').hide();
            $('#modCards').hide();
            $('#tbAddEditQuestion').hide();
            $('#tbQuestionsAdmin').hide();
            $('#btnSearchPlayer').hide();
            $('#btnNewQuestion').hide();
            $('#modPlayers').hide();
            $('#modWinnersRegistered').show();
            
            getcurrentregisteredwinners(gameID);

        });


        $('#mnPlayers').click(function () {
            var gameID = $('#hdnGameSessionID').val();

            //modQuestions
            //modWinnersRegistered
            //modPlayers
            //modCards

            $('#modCards').hide();
            $('#modQuestions').hide();
            $('#modWinnersRegistered').hide();
            $('#tbAddEditQuestion').hide();
            $('#tbQuestionsAdmin').hide();
            $('#btnSearchPlayer').hide();
            $('#btnNewQuestion').hide();
            $('#modPlayers').show();
      
            getAllPlayers(gameID);
        });

        $('#mnCards').click(function () {
            var gameID = $('#hdnGameSessionID').val();

            //modQuestions
            //modWinnersRegistered
            //modPlayers
            //modCards

            $('#modPlayers').hide();
            $('#modQuestions').hide();
            $('#modWinnersRegistered').hide();
            $('#tbAddEditQuestion').hide();
            $('#tbQuestionsAdmin').hide();
            $('#btnSearchPlayer').hide();
            $('#btnNewQuestion').hide();
            $('#modCards').show();

            getAllPlayerCards(gameID);
        });


        $('#tbQuestionsAdmin tr').hover(function () {
            $(this).addClass('hover');
        }, function () {
            $(this).removeClass('hover');
        });




        $('#GThemeClose').click(function () {

            var himgcls = document.getElementById('imgBingoHeader');
            var controlclsdata3 = himgcls.className;
            var arrclassname = controlclsdata3.split("_");
            var clstoapply = arrclassname[1];
            var currentskin;

            if (clstoapply == "Default") {

                currentskin = "defaulttheme";
            }
            else {

                currentskin = "corporatetheme";
            }



            $('#modGameTheme').hide();
            setbingotheme(currentskin);

        });

        function filterquestionstatus(tbodybyparam) {

            var gamearrkey = $('#hdnArrGameKey').val();

            var currentquestionId = "";

            $('#btnList').show();

            $.ajax({
                url: "/TTTBingo/FilterByQuestionStatus",
                xhrFields: { withCredentials: true },
                crossDomain: true,
                data: {
                    questiontoken: currentquestionId,
                    gamekeysessionid: gamearrkey[1]
                },
                type: "GET",
                dataType: "json",
                success: function (result, status, xhr) {

                    var resultFromServer = xhr.getResponseHeader("JSonQuestionsAskedResult");
                    //console.log(resultFromServer);
                    if (resultFromServer != "NoResults") {

           

                        var arrpotentialwinners = resultFromServer.split("|");
                        var arrlen = arrpotentialwinners.length;
                        var arrpotentialwinner;

                        var newtr_html = '';

                        for (var i = 0; i < arrlen - 1; i++) {

                            arrpotentialwinner = arrpotentialwinners[i].split(";");
                            //console.log(arrpotentialwinner);

                            newtr_html += "<tr style='color: blue;'><td>" + arrpotentialwinner[0] + "</td>\
                                    <td><textarea readonly style='color: blue;'>" + arrpotentialwinner[1] + "</textarea></td>\
                                    <td>" + arrpotentialwinner[2] + "</td>\
                                    <td>" + arrpotentialwinner[3] + "</td>\
                                    <td>" + "Read-only" + "</td></tr>";
                            //tbodybyparam
                            $(tbodybyparam).html(newtr_html);

                        }


                    }
                    else {
                

                        newtr_html += "<tr><td></td>\
                                           <td></td>\
                                           <td>" + " No results. " + "</td>\
                                           <td></td>\
                                           <td></td></tr >";
                                          
                        $(tbodybyparam).html(newtr_html);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert('Unexpected error: ' + 'Code: filterquestionstatus' + ' Status: ' + textStatus + " .Details: " + errorThrown);
                }
            });

        }

        function ConfirmDialogAllQActivation() {
            if (confirm("WARNING: Are you sure to ACTIVATE ALL the questions?")) {
         
                activateallquestions();
            }
            else {
                return false;
            }
        }

        function activateallquestions() {

           var allqgamearray =  $('#hdnArrGameKey').val();

            var cardcheckplayerId = "";

            hidepopdiv();

            $('#btnList').show();

            $.ajax({
                url: "/TTTBingo/ActivateAllQuestionsServer",
                xhrFields: { withCredentials: true },
                crossDomain: true,
                data: {
                    allqgameID: allqgamearray[1]
                },
                type: "POST",
                dataType: "json",
                success: function (result, status, xhr) {

                    var resultFromServer = xhr.getResponseHeader("JSonQuestionsActivatedResult");



                    var newtr_officialq = '';

                    if (resultFromServer != null && resultFromServer != "") {

                        officialquestionsls = resultFromServer.split("|");
                        var arrlen = officialquestionsls.length;

                        for (var h = 0; h < arrlen - 1; h++) {


                            var arrquestionlsofficial = officialquestionsls[h].split(";");

                            //QuestionId ; QuestionText ; QuestionStatus  ; Answer                       

                            newtr_officialq += "<tr style='color: green;'><td>" + arrquestionlsofficial[0] + "</td>\
                                            <td><textarea readonly style='color: green;'>" + arrquestionlsofficial[1] + "</textarea></td>\
                                            <td>" + arrquestionlsofficial[2] + "</td>\
                                            <td>" + arrquestionlsofficial[3] + "</td>\
                                            <td id='tdqdyn_" + h + "'><a href='#' id='lnkqEdit_" + h + "' onClick='Editme(" + h + ");' >Edit</a></td></tr>";

                            $('#tbdyQuestionsAdmin').html(newtr_officialq);
                        }

                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert('Unexpected error: ' + 'Code: getAllQuestions' + ' Status: ' + textStatus + " .Details: " + errorThrown);
                }
            });
        }

        function ConfirmDialogAllQDeactivated() {
            if (confirm("WARNING: Are you sure to DEACTIVATE ALL questions?")) {

                deactivateallquestions();
            }
            else {
                return false;
            }
        }

        function deactivateallquestions() {

            var deallqgamearray = $('#hdnArrGameKey').val();

            var cardcheckplayerId = "";

            hidepopdiv();

            $('#btnList').show();

            $.ajax({
                url: "/TTTBingo/ClearAllQuestionsServer",
                xhrFields: { withCredentials: true },
                crossDomain: true,
                data: {
                    deactivebygid: deallqgamearray[1]
                },
                type: "POST",
                dataType: "json",
                success: function (result, status, xhr) {

                    var resultFromServer = xhr.getResponseHeader("JSonQuestionsDEACTIVATEDResult");

                    var newtr_officialq = '';

                    if (resultFromServer != null && resultFromServer != "") {

                        officialquestionsls = resultFromServer.split("|");
                        var arrlen = officialquestionsls.length;

                        for (var h = 0; h < arrlen - 1; h++) {


                            var arrquestionlsofficial = officialquestionsls[h].split(";");

                            //QuestionId ; QuestionText ; QuestionStatus  ; Answer                       

                            newtr_officialq += "<tr style='color: red;'><td>" + arrquestionlsofficial[0] + "</td>\
                                                    <td><textarea readonly style='color: red;'>" + arrquestionlsofficial[1] + "</textarea></td>\
                                                    <td>" + arrquestionlsofficial[2] + "</td>\
                                                    <td>" + arrquestionlsofficial[3] + "</td>\
                                                    <td id='tdqdyn_" + h + "'><a href='#' id='lnkqEdit_" + h + "' onClick='Editme(" + h + ");' >Edit</a></td></tr>";

                            $('#tbdyQuestionsAdmin').html(newtr_officialq);
                        }

                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert('Unexpected error: ' + 'Code: getAllQuestions' + ' Status: ' + textStatus + " .Details: " + errorThrown);
                }
            });
        }

        function searchQbyText() {

            var currentquestionId = $('#txtSearchQ').val();

            $('#btnList').show();


            $.ajax({
                url: "/TTTBingo/SearchQbyText",
                xhrFields: { withCredentials: true },
                crossDomain: true,
                data: {
                    qbytxt: currentquestionId
                },
                type: "GET",
                dataType: "json",
                success: function (result, status, xhr) {

                    var resultFromServer = xhr.getResponseHeader("JSonSearchQbyTextResult");



                    if (resultFromServer != "NoResults") {

               

                        var arrpotentialwinners = resultFromServer.split("|");
                        var arrpotentialwinner;
                        var arrlen = arrpotentialwinners.length;

                        var newtr_html = '';

                        for (var i = 0; i < arrlen - 1; i++) {

                            arrpotentialwinner = arrpotentialwinners[i].split(";");

                            newtr_html += "<tr  style='color: deeppink;'><td>" + arrpotentialwinner[0] + "</td>\
                                    <td><textarea readonly style='color: deeppink;'>" + arrpotentialwinner[1] + "</textarea></td>\
                                    <td>" + arrpotentialwinner[2] + "</td>\
                                    <td>" + arrpotentialwinner[3] + "</td>\
                                    <td id='tdqdyn_" + i + "'><a href='#' id='lnkqEdit_" + i + "' onClick='Editme(" + i + ");' >Edit</a></td></tr>"; 

                            $('#tbdyQuestionsAdmin').html(newtr_html);

                        }


                    }
                    else {
                

                        newtr_html += "<tr><td></td>\
                                           <td></td>\
                                           <td>" + " No results. " + "</td>\
                                           <td></td>\
                                           <td></td></tr >";

                        $('#tbdyQuestionsAdmin').html(newtr_html);
                    }

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert('Unexpected error: ' + textStatus + " .Details: " + errorThrown);
                }
            });

        }


//****************************************************************************

        function getAllQuestions(gamesessionID) {

            var cardcheckplayerId = "";

            console.log('QUE DATA TENGO: ' + gamesessionID);

            $.ajax({
                url: "/TTTBingo/GetCurrentQuestions",
                xhrFields: { withCredentials: true },
                crossDomain: true,
                data: {
                    questionsbygameId: gamesessionID
                },
                type: "GET",
                dataType: "json",
                success: function (result, status, xhr) {

                    var resultFromServer = xhr.getResponseHeader("ListCurrentQuestionsResults");
                                 
                    var newtr_officialq = '';

                    //SHOW
                    $('#modQuestions').show();                    
                    $('#tbLQControls').show();
                    $('#titAllQ').show();
                    $('#btnNewQuestion').show();

                    //HIDE             
                    $('#QClose').hide();                
                    $('#btnQuestionsAsked').hide();             
                    $('#mnQActivateAll').hide();                
                    $('#mnQDeactivateAll').hide();                  
                    $('#mnQQSearch').hide();               
                    $('#titNewQ').hide();             
                    $('#titEditQ').hide();               
                    $('#tbAddEditQuestion').hide();                
                    $('#btnSaveQuestion').hide();                
                    $('#btnList').hide();                
                    $('#btnCreateAdminConsole').hide();

                    //IF QUESTIONS COUNT ==15
                  
                    if (resultFromServer == "INITIALQUESTIONNAIREDONE") {
                        //btnNewQuestion

                        $('#btnCreateAdminConsole').show();
                        $('#btnNewQuestion').hide();
                    }
                    else {
                        if (resultFromServer != null && resultFromServer != "") {

                            officialquestionsls = resultFromServer.split("|");
                            var arrlen = officialquestionsls.length;

                           

                            for (var h = 0; h < arrlen - 1; h++) {

                                var arrquestionlsofficial = officialquestionsls[h].split(";");
                                //var qeditionvalue = arrquestionlsofficial[0].toString() + '|' + h.toString();
                                var qeditionvalue = arrquestionlsofficial[0];
                                var qeditionvalue2 = h;
                                var qeditionvalue3 = qeditionvalue.toString() + "_" + qeditionvalue2.toString();
                                //console.log('LO QUE INTENTO ENVIAR: ' + qeditionvalue3);
                                $('#hdnQEdition').val(qeditionvalue3);
                                //hdnQEdition
                                //QuestionId ; QuestionText ; QuestionStatus  ; Answer

                                newtr_officialq += "<tr><td>" + arrquestionlsofficial[0] + "</td>\
                                    <td><textarea readonly>" + arrquestionlsofficial[1] + "</textarea></td>\
                                    <td>" + arrquestionlsofficial[2] + "</td>\
                                    <td>" + arrquestionlsofficial[3] + "</td>\
                                    <td id='tdqdyn_" + h + "'><a href='#' id='lnkqEdit_" + h + "' onClick='Editme(" + qeditionvalue3 + ");' >Edit</a></td></tr>";

                                $('#tbdyQuestionsAdmin').html(newtr_officialq);
                            }

                        }
                        else {

                            newtr_officialq += "<tr><td></td>\
                                    <td></td>\
                                    <td>" + " No results. " + "</td>\
                                    <td></td>\
                                    <td></td></tr>";

                            $('#tbdyQuestionsAdmin').html(newtr_officialq);
                        }
                    }



                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert('Unexpected error: ' + 'Code: getAllQuestions' + ' Status: ' + textStatus + " .Details: " + errorThrown);
                }
            });
        }

        function getAllPlayers(gamesID) {

            var cardcheckplayerId = "";

            $.ajax({
                url: "/TTTBingo/GetCurrentPlayers",
                xhrFields: { withCredentials: true },
                crossDomain: true,
                data: {
                    playersbygID: gamesID
                },
                type: "GET",
                dataType: "json",
                success: function (result, status, xhr) {

                    var resultFromServer = xhr.getResponseHeader("ListCurrentPlayersResults");
                    //167      ; PlayerH254_1;dasda     ; asdasd ; LINE1     |;168;PlayerE452_1;dasda;asdasd;LINE2|;169;PlayerC381_1;dasda;asdasd;LINE1|
                    //WinnerId ; PlayerNick  ; FullName ; Email  ; PrizeType |
                  
                    //$('#modWinnersRegistered').show();

                    var officialnexwinnerls;
                    var newtr_officialwin = '';

                    if (resultFromServer != null && resultFromServer != "")
                    {


                        if (resultFromServer != "NoPlayerListYet")
                        {
                            var officialnexwinnerls = resultFromServer.split("|");
                            var arrlen = officialnexwinnerls.length;

                            for (var h = 0; h < arrlen - 1; h++) {


                                var arrwinnerlsofficial = officialnexwinnerls[h].split(";");

                                //WinnerId ; PlayerNick  ; FullName ; Email  ; PrizeType |

                                newtr_officialwin += "<tr><td>" + arrwinnerlsofficial[0] + "</td>\
                                            <td>" + arrwinnerlsofficial[1] + "</td>\
                                            <td>" + arrwinnerlsofficial[2] + "</td>\
                                            <td>" + arrwinnerlsofficial[3] + "</td>\
                                            <td>" + arrwinnerlsofficial[4] + "</td>\
                                            </tr>";

                                $('#tbdyPlayersAdmin').html(newtr_officialwin);
                            }
                        }
                        else {
                            //SHOW APPROPRIATE MESSAGE TO THE ADMIN
                            newtr_officialwin += "<tr><td></td>\
                                            <td></td>\
                                            <td>No players found</td>\
                                            <td></td>\
                                            <td></td>\
                                            </tr>";

                            $('#tbdyPlayersAdmin').html(newtr_officialwin);
                        }

                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert('Unexpected error: ' + 'Code: getcurrentregisteredwinners' + ' Status: ' + textStatus + " .Details: " + errorThrown);
                }
            });
        }

        function getAllPlayerCards(gamebysesID) {

            var cardcheckplayerId = "";

            $.ajax({
                url: "/TTTBingo/GetCurrentPlayerCards",
                xhrFields: { withCredentials: true },
                crossDomain: true,
                data: {
                    playercardsbygameID: gamebysesID
                },
                type: "GET",
                dataType: "json",
                success: function (result, status, xhr) {

                    var resultFromServer = xhr.getResponseHeader("ListCurrentPlayerCardsResults");
                    //167      ; PlayerH254_1;dasda     ; asdasd ; LINE1     |;168;PlayerE452_1;dasda;asdasd;LINE2|;169;PlayerC381_1;dasda;asdasd;LINE1|
                    //WinnerId ; PlayerNick  ; FullName ; Email  ; PrizeType |                
         

                    var officialnexwinnerls;
                    var newtr_officialwin = '';

                    if (resultFromServer != null && resultFromServer != "")
                    {

                        if (resultFromServer != "NoCardsYet")
                        {
                            var officialnexwinnerls = resultFromServer.split("|");
                            var arrlen = officialnexwinnerls.length;

                            for (var h = 0; h < arrlen - 1; h++) {


                                var arrwinnerlsofficial = officialnexwinnerls[h].split(";");

                                //WinnerId ; PlayerNick  ; FullName ; Email  ; PrizeType |

                                newtr_officialwin += "<tr><td>" + arrwinnerlsofficial[0] + "</td>\
                                                    <td>" + arrwinnerlsofficial[1] + "</td>\
                                                    <td>" + arrwinnerlsofficial[2] + "</td></tr>";

                                $('#tbdyCardsAdmin').html(newtr_officialwin);
                            }
                        }
                        else
                        {
                            newtr_officialwin += "<tr><td></td>\
                                                    <td>No Cards found</td>\
                                                    <td></td></tr>";

                            $('#tbdyCardsAdmin').html(newtr_officialwin);
                        }

                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert('Unexpected error: ' + 'Code: getcurrentregisteredwinners' + ' Status: ' + textStatus + " .Details: " + errorThrown);
                }
            });
        }

        function getcurrentregisteredwinners(gamewinbysesID)
        {
            
            var cardcheckplayerId = "";

            $.ajax({
                url: "/TTTBingo/GetCurrentRegisteredWinners",
                xhrFields: { withCredentials: true },
                crossDomain: true,
                data: {
                    winnersbygameId: gamewinbysesID
                },
                type: "GET",
                dataType: "json",
                success: function (result, status, xhr) {
                                                                  
                    var resultFromServer = xhr.getResponseHeader("ListCurrentRegWinnersResults");
                    //167      ; PlayerH254_1;dasda     ; asdasd ; LINE1     |;168;PlayerE452_1;dasda;asdasd;LINE2|;169;PlayerC381_1;dasda;asdasd;LINE1|
                    //WinnerId ; PlayerNick  ; FullName ; Email  ; PrizeType |
                
                    $('#modWinnersRegistered').show();

                    var officialnexwinnerls;                              
                    var newtr_officialwin = '';

                    if (resultFromServer != null && resultFromServer != "") {


                        if (resultFromServer != "NoWinnersYet") {
                            var officialnexwinnerls = resultFromServer.split("|");
                            var arrlen = officialnexwinnerls.length;

                            for (var h = 0; h < arrlen - 1; h++) {


                                var arrwinnerlsofficial = officialnexwinnerls[h].split(";");

                                //WinnerId ; PlayerNick  ; FullName ; Email  ; PrizeType |

                                newtr_officialwin += "<tr><td>" + arrwinnerlsofficial[0] + "</td>\
                                    <td>" + arrwinnerlsofficial[1] + "</td>\
                                    <td>" + arrwinnerlsofficial[2] + "</td>\
                                    <td>" + arrwinnerlsofficial[3] + "</td>\
                                    <td>" + arrwinnerlsofficial[4] + "</td>\
                                    </tr>";

                                $('#tbdRegWinnersGrid').html(newtr_officialwin);
                            }
                        }
                        else {
                            newtr_officialwin += "<tr><td></td>\
                                    <td></td>\
                                    <td>No winners found</td>\
                                    <td></td>\
                                    <td></td>\
                                    </tr>";

                            $('#tbdRegWinnersGrid').html(newtr_officialwin);
                        }



                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert('Unexpected error: ' + 'Code: getcurrentregisteredwinners' + ' Status: ' + textStatus + " .Details: " + errorThrown);
                }
            });
        }

        function Joinplayer(playerid)
        {
            console.log('SAVING NEW PLAYER ID: ' + playerid);

            $('#hdnNewPlayerId').val(playerid);

            //PLAYER ENTERS GAMESESSIONID
            var playergamekey = $('#txtPlayerGameKey').val();



            if (playergamekey != null && playergamekey != undefined && playergamekey != "") {
                var gamesessionid = playergamekey;

                $.ajax({
                    url: "/TTTBingo/JoinNewPlayerToNewGameSession",
                    xhrFields: { withCredentials: true },
                    crossDomain: true,
                    data:
                    {
                        newjoinerid: playerid,
                        gameid: gamesessionid
                    },
                    type: "POST",
                    dataType: "json",
                    success: function (result, status, xhr) {
                        var resultFromServer = xhr.getResponseHeader("JSonJoinplayerResult");

                        if (resultFromServer != "Error")
                        {

                            if (resultFromServer == "GameIsOFF")
                            {                   
                                console.log('SAVING TWICE NEW PLAYER ID: ' + playerid);
                                $('#hdnNewPlayerId').val(playerid);

                                 $('#modPlayerGameKey').hide();
                                 $('#modRegisterWinners').show();

                            }
                            else
                            {
                                if (resultFromServer == "GameIsON")
                                {
                                    $('#dvGeneralRegistration').hide();
                                    $('#dvTooEarly').hide();
                                    $('#dvNotAllowed').show();
                                }
                                else
                                {

                                    if (resultFromServer == "INVALIDSESSIONID")
                                    {
                                        var invalidmsg = "You entered an invalid Game Key, please try again or contact your local SL leader.";
                                        setInformationModePlayer(invalidmsg);

                                        var nofunction = "";
                                        $('#hdnRemoteFunctionNParam').val(nofunction);
                                    }
                                }
                            }

                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        //alert('Unexpected error: ' + 'Code: RegisterAdditionalDataPlayer' + ' Status: ' + textStatus + " .Details: " + errorThrown);
                    }
                });
            }
            else {
                var underanalysismsg = "Please, enter a valid Game Key, provided by the Administrator, then try again.";
                setInformationModePlayer(underanalysismsg);

                var nofunction = "";
                $('#hdnRemoteFunctionNParam').val(nofunction);
            }

        }

        $('#btnPlayerStart').click(function () {

            var newjoinerplayerid = $('#hdnNewPlayerId').val();

            console.log('NEW PLAYER ID IS: ' + newjoinerplayerid);

            Joinplayer(newjoinerplayerid);

        });

        function RegisterAdditionalDataPlayer() {

          
            var adminplayerId = $('#hdnNewPlayerId').val();

            console.log('RETRIEVING NEW PLAYER ID: ' + adminplayerId);

            var adddatafname = $('#txtRegWinFullName').val();
            var adddataemail = $('#txtRegWinEmail').val();
            var adddataGPN = $('#txtRegWinGPN').val();


            $.ajax({
                url: "/TTTBingo/RegisterAdditionalDataPlayer",
                xhrFields: { withCredentials: true },
                crossDomain: true,
                data: {
                    fromnewplayerid: adminplayerId,
                    addregfname: adddatafname, 
                    addregemail: adddataemail, 
                    addregGPN: adddataGPN, 
                },
                type: "POST",
                dataType: "json",
                success: function (result, status, xhr) {

                    var resultFromServer = xhr.getResponseHeader("JSonRegisterAdditionalDataPlayerResult");

                    //modRegisterWinners
                    $('#modRegisterWinners').hide();

                    if (resultFromServer != "Error")
                    {
                        if (resultFromServer == "ADMIN")
                        {


                            //***** Show ADMIN options and controls  *****
                            //WHEN ADMIN CREATE: ADMIN;12;ADMIN

                            $('#modNewGameSession').show();

                        }
                        else
                        {
                            //***** Show PLAYER options and controls  *****
                            var arr = resultFromServer.split(";");

                            //SAVING PLAYER ID FOR LATER USE ON btnPlayerStart
                            $('#hdnNewPlayerId').val(arr[1]);          
                            //$('#modPlayerGameKey').show();

                            console.log('PLAYER CARD:' + resultFromServer);


                                var arr = resultFromServer.split(";");

                                //WHEN PLAYER CREATE:         
                                //TRIVIA STRING MODEL:
                                //35;  TTTBingo;968;PlayerD411;Transparent;Long;Salty;Brown;Green;White;

                                //BINGO CLASSIC STRING MODEL:
                                //2153;TTTBingo;39 ;PlayerD159;8          ;5   ;4    ;12   ;14   ;1

                                var indexer = 0;
                                var arrlen = arr.length;
                                var dvids = 'dvCell';
                                var playernick = arr[3];
                                //newjoinerbyplayerid.PlayerId + ";" + objgameses.Name + ";" + gameid + ";" + playernickname + ";" + playerhits;

                                var gamsessionid = arr[2];

                                //STORE GAME SESSION ID FOR NEXT USE IN THE PLAYER SIDE....
                                $('#hdnGameSessionIDplayer').val(gamsessionid);

                                $('#tbPlayerNickname').show();
                                $('#div1').show();

                                //ADD GAME NAME....
                                //h3gamename
                                $('#h3gamename').show();
                                $('#h3gamename').text(arr[1]);

                                $('#lblPlayerName').show();
                                $('#spNickname').show();
                                $('#spNickname').text(playernick);
                                //dvYourCard
                                $('#dvBingoCard').show();
                                $('#dvYourCard').show();
                                //Card construction for the current player
                                indexer = 4;
                                for (i = 4; i < arrlen - 1; i++)
                                {
                                    indexer = i - 3;
                                    // indexer = i - 1;

                                    $('#' + dvids + indexer).text(arr[i]);
                                }

                                //Check for next question every 1 second

                                //var secplayer1 = 1;
                                //getnextqplayer(secplayer1);

                                var countsecshowplayer = 1;
                                getplayerscount(countsecshowplayer, gamsessionid);

                                //Checks for a skin change request every 1 second.
                                //var checkskinrequesttimer2 = 1;
                                //getbingoskinrequest(checkskinrequesttimer2, gamsessionid);

                        }
                    }
                    
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert('Unexpected error: ' + 'Code: RegisterAdditionalDataPlayer' + ' Status: ' + textStatus + " .Details: " + errorThrown);
                }
            });

        }


        function Checkquestionsentered() {

            var hdnArrGameKey = $('#hdnArrGameKey').val();
            var arr = hdnArrGameKey.split("_");

            $.ajax({
                url: "/TTTBingo/VerifyQuestionsLoaded",
                xhrFields: { withCredentials: true },
                crossDomain: true,
                data: {
                    gamesessionId: arr[1]

                },
                type: "GET",
                dataType: "json",
                success: function (result, status, xhr) {

                    var resultFromServer = xhr.getResponseHeader("JSonVerifyQuestionsLoadedResult");


                    if (resultFromServer == "QUESTIONSLOADED") {
                        //var hdnArrGameKey = $('#hdnArrGameKey').val();

                        //var arr = hdnArrGameKey.split("_");

                        //console.log('GAME ADMIN FROM TRIVIA: '+ hdnArrGameKey);

                        var gamekeymsg = "Welcome to the " + arr[0] + " Bingo!!. Please share the following Game Key  with the players so they can enter now: " + arr[0] + "_" + arr[1];
                        setInformationMode(gamekeymsg);

                        var functiontype = "LoadAdminPanel";

                        $('#hdnRemoteFunctionNParam').val(functiontype);

                        $('#hdnArrGameKey').val(hdnArrGameKey);
                    }
                    else {
                        var gamekeymsg2 = "You need to create at least 15 questions for this Trivia.";
                        setInformationMode(gamekeymsg2);

                        var functiontype = "";
                        //$('#hdnRemoteFunctionNParam').val();
                          $('#hdnRemoteFunctionNParam').val(functiontype);

                        //$('#hdnArrGameKey').val(hdnArrGameKey);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert('Unexpected error: ' + 'Code: RegisterAdditionalDataPlayer' + ' Status: ' + textStatus + " .Details: " + errorThrown);
                }
            });

}

        $('#btnCreateAdminConsole').click(function () {
           
            Checkquestionsentered();
        });


        function LoadAdminPanel() {

            var securevar =   $('#hdnArrGameKey').val();
            var gamekeyoptions = securevar.split("_");

            var localarr = gamekeyoptions;

            console.log(' NAME: ' + localarr[0] + ' SESSION ID: ' + localarr[1] + ' ADMIN NAME: ' + localarr[2]);

            hidepopdiv();

            $('#dvAdmin').show();
            //
            $('#dvPlayersReady').show();

            $('#modNewGameSession').hide();

            //modQuestions
            $('#modQuestions').hide();

            //SHOW ADMIN CONSOLE FOR THE NEW GAME                     
            //REST OF THE CONTROLS FOR THE NEW ADMIN
            $('#tbAdmin').show();

            $('#lblGameStatus').show();
            $('#spGameStatus').show();
            $('#spGameStatus').text(" OFF");


            //lblAdminName
            //spAdminName
            $('#lblAdminName').show();
            $('#spAdminName').show();
            $('#spAdminName').text(" Hi " + gamekeyoptions[2]);


            $('#lblAdmin').show();
            $('#spAdmin').show();
            //Game key: GAME NAME + GAME SESSION ID
            $('#spAdmin').text(" Game Key: " + gamekeyoptions[0] + "_" + gamekeyoptions[1]);

            //TO DO FIX: REENABLE FOR MULTI SESSION VERSION
            $('#mnQuestions').show();
            //$('#mnGameTheme').show();


            $('#mnPlayers').show();
            $('#mnCards').show();


            $('#dvAdmin').show();

            //Check Players Count every 1 second
            var countsecupdpADMIN = 1;
            getplayerscount(countsecupdpADMIN, gamekeyoptions[1]);

            //Refresh New Players Monitor every 1 second
            var monsec = 1;
            refreshplayersmon(monsec, gamekeyoptions[1]);

            //STORING GAMESESSIONID FOR LATER USE IN THE OPTIONS MENU
            $('#hdnGameSessionID').val(gamekeyoptions[1]);
        }

        $('#rbTypeTrivia').click(function () {
            $('#rbTypeClassic').prop('checked', false);
        });

        $('#rbTypeClassic').click(function () {
            $('#rbTypeTrivia').prop('checked', false);
        });



        function CreateNewGameSession() {

            hidepopdiv();

            var adminplayerId = $('#hdnNewPlayerId').val();

            var newgamename = $('#txtNewGameName').val();
            var newgamedescription = $('#txtNewGameDescription').val();
            var newgameobs = $('#txtObservations').val();

            var newgametype = "";

            if ($("#rbTypeTrivia").is(":checked")) {
                newgametype = "TRIVIA";
      
            }
            else if ($("#rbTypeClassic").is(":checked")) {
                newgametype = "CLASSIC";
       
            }         

            //console.log('ADMIN ID: ' + adminplayerId + ' GAMENAME: ' + newgamename + ' GAME DESC: ' + newgamedescription + ' GAME OBS: ' + newgameobs + ' GAME TYPE: ' + newgametype);

            $.ajax({
                url: "/TTTBingo/CreateNewGameSession",
                xhrFields: { withCredentials: true },
                crossDomain: true,
                data: {
                    gameadminId: adminplayerId,
                    gamename: newgamename,
                    gamedesc: newgamedescription,
                    gametype: newgametype,
                    gameobs: newgameobs
                },
                type: "POST",
                dataType: "json",
                success: function (result, status, xhr) {

                    var resultFromServer = xhr.getResponseHeader("JSonCreateNewGameSessionResult");

                    //EXAMPLE:
// "NEWGAMECLASSIC" + ";" + gamename + "_" + newgamesession.GameSessionId.ToString() + "_" + adminfornewgame.Name;
// "NEWGAMETRIVIA"  + ";" + gamename + "_" + newgamesession.GameSessionId.ToString() + "_" + adminfornewgame.Name;

                    var arrnewgame = resultFromServer.split(";");
                    var resfromserver = arrnewgame[0]; //"NEWGAMECLASSIC"
                    var newgamename = arrnewgame[1];   //THIS IS THE ACTUAL GAME KEY.
                     //gamename + "_" + newgamesession.GameSessionId.ToString()+ "_" + adminfornewgame.Name

                    var arrgamekey = newgamename.split("_");


                    //arrgamekey[0]: GAME NAME
			        //arrgamekey[1]: GAME SESSIONID

                    //modNewGameSession

                    $('#modNewGameSession').hide();

                    if (resfromserver != "Error") {

                            if (resfromserver == "ONLYONEGAMENAME") {

                                var onlyonemsg = "The name for every new game must be unique. Please contact your immediate SL Leader.";
                                setInformationMode(onlyonemsg);

                                var nofunction = "";
                                $('#hdnRemoteFunctionNParam').val(nofunction);                          

                            }
                            else {

                                if (resfromserver == "NEWGAMETRIVIA") {

                                    //ALLOWS TO CREATE NEW QUESTIONS FOR THE NEW BINGO-TRIVIA...
                                    //modNewGameSession
                                    $('#modNewGameSession').hide();

                                    $('#modQuestions').show();                                    
                                    $('#btnCreateAdminConsole').hide();


                                    $('#btnQuestionsAsked').hide();
                                    $('#mnQActivateAll').hide();
                                    $('#mnQDeactivateAll').hide();

                                    //QClose
                                    $('#QClose').hide();
                                    //mnQQSearch
                                    $('#mnQQSearch').hide();



                                    $('#hdnArrGameKey').val("NEWGAMETRIVIA" + ";" + newgamename);

                                    //console.log('STORED VALUE FROM NEWGAMESESSION: ' + newgamename);
                                }
                                else {

                                    if (resfromserver == "NEWGAMECLASSIC") {

                                        //console.log('TRYING TO START CLASSIC BINGO');
                                        //SHOW INFO POPUP WITH THE GAMEKEY, SO THE ADMIN CAN SEND IT TO THE PLAYERS
                                        //IN ORDER FOR THEM TO PARTICIPATE...
                                      

                                        var gamekeymsg = "Welcome to the " + arrgamekey[0] + " Bingo!!. Please share the following Game Key  with the players, so they can enter now: " + arrgamekey[0] + "_" + arrgamekey[1];
                                        setInformationMode(gamekeymsg);

                                        var functiontype = "LoadAdminPanel";
                                        $('#hdnRemoteFunctionNParam').val(functiontype);

                                        $('#hdnArrGameKey').val(newgamename);
  
                                    }
                                }

                            }                     

                    }

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert('Unexpected error: ' + 'Code: RegisterAdditionalDataPlayer' + ' Status: ' + textStatus + " .Details: " + errorThrown);
                }
            });

        }

        function RegisterWinnerOfficial() {


            hidepopdiv();


            var winerid = $('#hdnCheckCardPlayerId').val();
            var composedvalreg = $('#hdnWinnerCurrentCardPrizeType').val();

            //PrizeType + ";" + "PlayerName"
            var arrcompositionreg = composedvalreg.split(";");           
            var winerprize = arrcompositionreg[0];

            $.ajax({
                url: "/TTTBingo/RegisterWinnerOfficial",
                xhrFields: { withCredentials: true },
                crossDomain: true,
                data: {
                    winerplayerid: winerid,                
                    winerplayerprize: winerprize                   
                },
                type: "POST",
                dataType: "json",
                success: function (result, status, xhr) {

                    var resultFromServer = xhr.getResponseHeader("JSonRegisterWinnerOfficialResult");                    

                    if (resultFromServer != "Error") {

                        $('#modRegisterWinners').hide();
                        $('#modCardDetails').hide();
                        $('#modPlayerCard').hide();
                        $('#tbNotifyPlayers').show();
                        $('#btnNotify').show();
                 

                        //REPLACE CHECK TEXT FOR "GREEN" MARK: 
                        //(Approved) INDICATING POTENTIAL WINNER WAS CONFIRMED AS WINNER

                        //GET ELEMENT ID OF CURRENTLY ANALYZED PLAYER FROM HIDDENFIELD
                        var cardconfirmedwinnerplayerId2 = $('#hdnCurrentAnalyzedPlayerCardTD').val();

                        //EXAMPLE: lnkCheck_2
                        //EXAMPLE FOR CORRESPONDING td: tddyn_2

                        var lnk = 'lnkCheck_';
                        var tdtid = 'tddyn_';

                        $('#' + lnk + cardconfirmedwinnerplayerId2).hide();

                        $('#' + tdtid + cardconfirmedwinnerplayerId2).css({'background-color': 'limegreen','color': 'white'});

                        $('#' + tdtid + cardconfirmedwinnerplayerId2).html('Approved');

                        if (winnersthisround == "") {
                            winnersthisround = cardconfirmedwinnerplayerId2 + "_APPROVED" + ";"
                        }
                        else {
                            winnersthisround = winnersthisround + cardconfirmedwinnerplayerId2 + "_APPROVED" + ";"
                        }
                       
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert('Unexpected error: ' + 'Code: checkforwinners' + ' Status: ' + textStatus + " .Details: " + errorThrown);
                }
            });

        }



        function CleanupmodPlayerCard() {

            var dvids = 'dvCell';

            $('#iIcon10').hide();
            $('#iIcon17').hide();
            $('#dvCell17').text("");
            $('#dvCell10').text("");

            if ($('#dvCell10').hasClass("dvWinnerCorrectCell")) {
                $('#dvCell10').removeClass("dvWinnerCorrectCell");
            }
            else {
                if ($('#dvCell10').hasClass("dvWinnerIncorrectCell")) {
                    $('#dvCell10').removeClass("dvWinnerIncorrectCell");
                }
            }

            if ($('#dvCell17').hasClass("dvWinnerCorrectCell")) {
                $('#dvCell17').removeClass("dvWinnerCorrectCell");
            }
            else {
                if ($('#dvCell17').hasClass("dvWinnerIncorrectCell")) {
                    $('#dvCell17').removeClass("dvWinnerIncorrectCell");
                }
            }


            for (var q = 11; q < 17; q++) {
                $('#' + dvids + q).text("");

                if ($('#' + dvids + q).hasClass("dvWinnerCorrectCell")) {
                    $('#' + dvids + q).removeClass("dvWinnerCorrectCell");
                }
                else {
                    if ($('#' + dvids + q).hasClass("dvWinnerIncorrectCell")) {
                        $('#' + dvids + q).removeClass("dvWinnerIncorrectCell");
                    }
                }
            }
        }


        function CheckPlayerCard(elem) {

            $('#modPlayerCard').hide();

            //EXAMPLE: lnkCheck_2
            //EXAMPLE FOR CORRESPONDING td: tddyn_2
            var id = $(elem).attr("id");
            var arrelemid = id.split("_");
            var playerglobalarrposition = arrelemid[1];     

            $('#hdnCurrentAnalyzedPlayerCardTD').val(playerglobalarrposition);


            //EXAMPLE:
            //2; LINE1; PlayerP77_1; 2202; Goni_False; Sharepoint101_False; Fabiola_False; NA_False; NA_False; NA_False
            //2; LINE2; PlayerF76_1; 2203; NA_False; NA_False; NA_False; Sharepoint101_False; Jonatan_False; Fabiola_False;

            var arr = arrprizeclaims[playerglobalarrposition].split(";");            

            var prizetype = arr[1];
            var playernick = arr[2];

            //PrizeType + ";" + "PlayerName"
            var composevalfromcheck = arr[1] + ";" + arr[2];
            $('#hdnCheckCardPlayerId').val(arr[3]);
            $('#hdnWinnerCurrentCardPrizeType').val(composevalfromcheck);
       

       
            $('#modPlayerCard').show();
            $('#CloseModPlayerCard').show();

            var playerarr = playernick.split("_");
            $('#spPlayerName').text(" #" + playerarr[0] + " claims ");

            CleanupmodPlayerCard();

            //_Default CARD PLAYER ASSUMES THIS PLAYER WON THE BINGO
            //Set LINE 1 as Correct
            $('#dvCell10').addClass("dvWinnerCorrectCell");
            $('#dvCell10').text("Line1 approved");
        

            //Set LINE 2 as Correct
            $('#dvCell17').addClass("dvWinnerCorrectCell");
            $('#dvCell17').text("Line2 approved");
        


            if (prizetype == "BINGO") {

                var dvidsbingo = 'dvCell';
                var winnercardindexerbingo = 0;
                var innerindexerbingo = 0;
                var arrlen = 0;
                arrlen = arr.length;          

                var isanswertruebingo = false; 

                $('#spPlayerPrize').text(prizetype + ".");   




                //EXAMPLE FOR BINGO
                //1;BINGO;PlayerY710_1;2315;ATTG_False;Gustavo_False;Diego_False;Emi_False;Sharepoint101_False;.NET_False;
               
                for (var i = 5; i < arrlen; i++) {

                    winnercardindexerbingo = i + 6;
                    innerindexerbingo = i - 1;
                  
                    var resultarrbingo = arr[innerindexerbingo].split("_");

                    if (resultarrbingo[1] == "True") {
                        isanswertruebingo = true;
                    }
                    else {
                        isanswertruebingo = false;
                    }

                    if (isanswertruebingo) {
                        //IF THIS ANSWER IS CORRECT IT GETS MARKED AS CORRECT. 
                        $('#' + dvidsbingo + winnercardindexerbingo).addClass("dvWinnerCorrectCell");
                        $('#' + dvidsbingo + winnercardindexerbingo).text(resultarrbingo[0]);
                    }
                    else {
                        //IF ONLY ONE ANSWER IS NOT CORRECT, THEN THE PLAYER HAS LOST THE BINGO.
                        //Remove CORRECT Setting
                        $('#dvCell10').removeClass("dvWinnerCorrectCell");
                        $('#dvCell10').text("");
          

                        $('#dvCell17').removeClass("dvWinnerCorrectCell");
                        $('#dvCell17').text("");
           

                        //Set Bingo card as INCORRECT
                        $('#dvCell10').addClass("dvWinnerIncorrectCell");
                        $('#dvCell10').text("X");
                        $('#dvCell17').addClass("dvWinnerIncorrectCell");
                        $('#dvCell17').text("X");

                        //MARK CURRENT ANSWER AS INCORRECT
                        $('#' + dvidsbingo + winnercardindexerbingo).addClass("dvWinnerIncorrectCell");
                        $('#' + dvidsbingo + winnercardindexerbingo).text(resultarrbingo[0]);
                    }
                }

            }
            else {

                //EXAMPLE FOR ONE LINE:
                //2; LINE1; PlayerP77_1; 2202; Goni_False; Sharepoint101_False; Fabiola_False; NA_False; NA_False; NA_False
                //2; LINE2; PlayerF76_1; 2203; NA_False; NA_False; NA_False; Sharepoint101_False; Jonatan_False; Fabiola_False;

                if (prizetype == "LINE1") {

                    var winnercardindexerl1 = 0;
                    var innerindexerl1 = 0;
                    var isanswertruel1 = false;
                    var dvidsl1 = 'dvCell';
                    var numberoftruehitsl1 = 0;

                    $('#spPlayerPrize').text(prizetype + ".");

                    //ALL CELLS OF LINE2 WILL BE MARKED AS NOT AVAILABLE FOR REVISION
                    $('#dvCell14').text("");
                    $('#dvCell15').text('LINE2 not analyzed.');
                    $('#dvCell16').text("");

                    //SINCE LINE2 WON'T BE ANALYZED, THEN REMOVE THE CORRECT MARK FOR THAT LINE
                    if ($('#dvCell17').hasClass("dvWinnerCorrectCell")) {
                        $('#dvCell17').removeClass("dvWinnerCorrectCell");
                        $('#dvCell17').text("");
                
                    }

                    for (var r=5; r < 8; r++) {
                          winnercardindexerl1 = r + 6;
                          innerindexerl1 = r - 1;
                      
                        
                            var resultarrline1 = arr[innerindexerl1].split("_");


                            if (resultarrline1[1] == "True") {
                                isanswertruel1 = true;
                            }
                            else {
                                isanswertruel1 = false;
                            }

                            if (isanswertruel1) {
                            //IF THIS ANSWER IS CORRECT IT GETS MARKED AS CORRECT.            
                              $('#' + dvidsl1 + winnercardindexerl1).addClass("dvWinnerCorrectCell");
                                $('#' + dvidsl1 + winnercardindexerl1).text(resultarrline1[0]);
                                numberoftruehitsl1++;
                      
                            }
                            else
                            {
                                //IF THIS ANSWER IS NOT CORRECT, THEN THE WHOLE LINE 1 GETS MARKED AS WRONG.
                                //Remove "CORRECT" Setting

                                //ADDITIONALLY, THIS PARTICULAR ANSWER GETS MARKED AS WRONG.
                                  $('#' + dvidsl1 + winnercardindexerl1).addClass("dvWinnerIncorrectCell");
                                  $('#' + dvidsl1 + winnercardindexerl1).text(resultarrline1[0]);

                            }
                    }

                  
                    if (numberoftruehitsl1 == 3) {
                        //LINE MARKED AS CORRECT
                        if ($('#dvCell10').hasClass("dvWinnerIncorrectCell")) {

                            $('#dvCell10').removeClass("dvWinnerIncorrectCell");
                            $('#dvCell10').addClass("dvWinnerCorrectCell");
                 
                        }
                        else {
                
                        }
                    }
                    else {
                       //LINE MARKED AS INCORRECT
                        if ($('#dvCell10').hasClass("dvWinnerCorrectCell")) {
                            $('#dvCell10').removeClass("dvWinnerCorrectCell");
                 

                            $('#dvCell10').addClass("dvWinnerIncorrectCell");
                            $('#dvCell10').text("X");
                        }
                    }



                }
                else {
                    if (prizetype == "LINE2") {


                        var winnercardindexerl2 = 0;
                        var innerindexerl2 = 0;
                        var isanswertruel2 = false;
                        var dvidsl2 = 'dvCell';
                        var numberoftruehitsl2 = 0;

                        $('#spPlayerPrize').text(prizetype + ".");

                        //ALL CELLS OF LINE1 WILL BE MARKED AS NOT AVAILABLE FOR REVISION
                        $('#dvCell11').text("");
                        $('#dvCell12').text('LINE1 not analyzed.');
                        $('#dvCell13').text("");

                        //SINCE LINE1 WON'T BE ANALYZED, THEN REMOVE THE "CORRECT" MARK FOR THAT LINE
                        if ($('#dvCell10').hasClass("dvWinnerCorrectCell")) {
                            $('#dvCell10').removeClass("dvWinnerCorrectCell");
                            $('#dvCell10').text("");
                   
                        }

                        for (var s = 8; s < 11; s++) {
                            winnercardindexerl2 = s + 6;
                            innerindexerl2 = s - 1;

                            var resultarrline2 = arr[innerindexerl2].split("_");
                           
                            if (resultarrline2[1] == "True") {
                                isanswertruel2 = true;
                            }
                            else {
                                isanswertruel2 = false;
                            }

                            if (isanswertruel2) {
                                //IF THIS ANSWER IS CORRECT IT GETS MARKED AS CORRECT.
                                $('#' + dvidsl2 + winnercardindexerl2).addClass("dvWinnerCorrectCell");
                                $('#' + dvidsl2 + winnercardindexerl2).text(resultarrline2[0]);
                                numberoftruehitsl2++;
                            }
                            else {



                                //ADDITIONALLY, THIS PARTICULAR ANSWER GETS MARKED AS WRONG.
                                $('#' + dvidsl2 + winnercardindexerl2).addClass("dvWinnerIncorrectCell");
                                $('#' + dvidsl2 + winnercardindexerl2).text(resultarrline2[0]);

                            }
                        }

                       
                        if (numberoftruehitsl2 == 3) {
                            //LINE MARKED AS CORRECT
                            if ($('#dvCell17').hasClass("dvWinnerIncorrectCell")) {

                                $('#dvCell17').removeClass("dvWinnerIncorrectCell");
                                $('#dvCell17').addClass("dvWinnerCorrectCell");
                             
                            }
                            else {
                         
                            }
                        }
                        else {
                            //LINE MARKED AS INCORRECT
                            if ($('#dvCell17').hasClass("dvWinnerCorrectCell")) {
                                $('#dvCell17').removeClass("dvWinnerCorrectCell");
                  

                                $('#dvCell17').addClass("dvWinnerIncorrectCell");
                                $('#dvCell17').text("X");
                            }
                        }

                    }
                }
            }

            globalarraypositioncheckedcard = playerglobalarrposition;

        }
 

        $('#btnNotWinner').click(function () {
    

            var bingomode;
            var confirmMsg = "Are you sure this player didn't win?";
            var funcname = "ConfirmNotWinner";
            ConfirmDialogBingo(bingomode, funcname, confirmMsg);

            var cancelnotwinner = "CancelConfirmWinner";
            $('#hdnCancelOperations').val(cancelnotwinner);
        });



        $('#btnContinuePlay').click(function () {
         

            //CONFIRM:  
            var bingomode;
            var confirmMsg = "This round has ended, continue playing?";
            var funcname = "ConfirmContinuePlay";
            ConfirmDialogBingo(bingomode, funcname, confirmMsg);

            //CANCEL OPS
            var cancelcontinue = "ContinuePlay";
            $('#hdnCancelOperations').val(cancelcontinue);
        });


        $('#btnConfirmWinner').click(function () {

            //CONFIRM:  
            var bingomode;
            var confirmMsg = "Are you sure this player is a winner?";
            var funcname = "RegisterWinnerOfficial";
            ConfirmDialogBingo(bingomode, funcname, confirmMsg);

        

            var cancelwinner = "CancelConfirmWinner";
            $('#hdnCancelOperations').val(cancelwinner);

        });


        function ConfirmContinuePlay() {

                 hidepopdiv();

                $('#btnContinuePlay').hide();
                $('#dvWinnersGrid').hide();
                $('#dvGameModeControls').show();
            
        }

        function ConfirmNotWinner()
        {

            hidepopdiv();

            var cardconfirmedwinnerplayerId = $('#hdnCurrentAnalyzedPlayerCardTD').val();

            $.ajax({
                url: "/TTTBingo/RegisterFailedAttempt",
                xhrFields: { withCredentials: true },
                crossDomain: true,
                data: {
                    failedattemptplayerid: cardconfirmedwinnerplayerId
                },
                type: "POST",
                dataType: "json",
                success: function (result, status, xhr) {

                    var resultFromServer = xhr.getResponseHeader("JSonRegisterWinnerOfficialResult");

                    if (resultFromServer != "Error")
                    {
                        var lnk = 'lnkCheck_';
                        var tdtid = 'tddyn_';

                        //Marks Grid (Denied)incorrect
                        $('#modCardDetails').hide();
                        $('#modPlayerCard').hide();

                        $('#tbNotifyPlayers').show();
                        $('#btnNotify').show();

                        $('#' + lnk + cardconfirmedwinnerplayerId).hide();

                        $('#' + tdtid + cardconfirmedwinnerplayerId).css({ 'background-color': 'red', 'color': 'white' });

                        $('#' + tdtid + cardconfirmedwinnerplayerId).html('Denied');
               

                        if (winnersthisround == "") {
                            winnersthisround = cardconfirmedwinnerplayerId + "_DENIED" + ";"
                        }
                        else {
                            winnersthisround = winnersthisround + cardconfirmedwinnerplayerId + "_DENIED" + ";"
                        }

                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert('Unexpected error: ' + 'Code: checkforwinners' + ' Status: ' + textStatus + " .Details: " + errorThrown);
                }
            });

        }

  



        function continueplaying(secstocontinue) {

            var timercontinueplaying1 = setInterval(function () {
                secstocontinue--;
                if (secstocontinue == -1) {
                    clearInterval(timercontinueplaying1);
                    timercontinueplaying1 = undefined;

                    hidepopdiv();

                    $('#btnContinuePlay').show();
                    $('#btnNotify').hide();

                    //HIDE BUTTON(LINE OR BINGO)
                    $('#btnGotLine').hide();
                    $('#btnGotBingo').hide();

                }

            }, 1000);

        }

        function notifywinners() {

            var nowinnersforthisround = true;
            var gamemode3 = $('#spGameMode').text();
            var eventype = "";

                $('#dvWinnersGrid').hide();
                $('#btnNotify').hide();

                

            
            var progressmsg = 'Notifying players about results check of ' + gamemode3 + ' claims';
            setWarningMode(progressmsg);

           //THE btnNotify WILL ANALYZE THE RESULTS OF THAT winnersthisround LIST
           //ALL HAVING DENIED PRIZES MEANS EVENTYPE "11" (No winners for this round)
           //INDEPENDENTLY OF WHETHER THERE WERE WINNERS ON PREVIOUS ROUNDS....
            //EXAMPLE: 10589_DENIED;10590_APPROVED;10591_APPROVED;

            //console.log('GLOBAL LIST OF ANALYZED POTENTIAL WINNERS: ' + winnersthisround);

            if (winnersthisround != "") {

                var arrwinnersthisround = winnersthisround.split(";");

                for (var hb = 0; hb < arrwinnersthisround.length; hb++) {

                    //TODO SPLIT STRING MAY BE NECESSARY
                    var arrplayerclaimresult = arrwinnersthisround[hb].split("_");

                    if (arrplayerclaimresult[1] == "APPROVED") {
                        nowinnersforthisround = false;
                    }

                }

            }


            if (nowinnersforthisround)
            {
                eventype = "11";
            }
            else
            {
                if (gamemode3 == " Line")
                    eventype = "2";
                else
                    eventype = "4";
            }




                $.ajax({
                url: "/TTTBingo/NotifyPlayers",
                xhrFields: {withCredentials: true },
                crossDomain: true,
                data: {
                notifyvalue: eventype},
                type: "POST",
                dataType: "json",
                success: function (result, status, xhr) {

                            var resultFromServer = xhr.getResponseHeader("NotifyResults");


                            //HIDE BUTTON(LINE OR BINGO)
                            $('#btnGotLine').hide();
                            $('#btnGotBingo').hide();

                            if (resultFromServer != "Error") {

                                    //Show Game off button
                                    //Continue playing? YES/NO

                                    //YES:
                                    //Show Number of players
                                    //Show button

                                var tmrbeforecontinue = 15;
                                continueplaying(tmrbeforecontinue);

                            }

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert('Unexpected error: ' + 'Code: notifywinners' + ' Status: ' + textStatus + " .Details: " + errorThrown);
                }
        });
        }



//END ADMIN FUNCTIONS---------------------


        $('#chkAutomaticNick').click(function () {
            if ($('#chkAutomaticNick').is(':checked')) {
        $('#lblCustomNick').hide();
    $('#txtCustomNick').val('');
    $('#txtCustomNick').hide();
}
            else {
        $('#txtCustomNick').val('');
    $('#lblCustomNick').show();
    $('#txtCustomNick').show();
}

});

        $('#txtCustomNick').keypress(function (event) {
            if (event.keyCode == 13) {
        $('#btnRegisterPlayer').click();
}
});

        $('#btnRegisterPlayer').click(function () {
            var playerExist="";

            if ($('#chkAutomaticNick').is(':checked'))
            {
                playerExist = GenerateAutomaticPlayer();
                $('#txtCustomNick').val('');
            }
            else
            {
                playerExist = $('#txtCustomNick').val();

                if (!/[^a-zA-Z0-9]/.test(playerExist)) {
                    //Nickname accepted
                }
                else {
                    //Nickname rejected
                    playerExist = "";
                }

                $('#txtCustomNick').val('');
            }

            if (playerExist != null && playerExist != "") {
                $('#dvGeneralRegistration').hide();
           
                updateplayer(playerExist);
                $('#txtCustomNick').val('');
                playerExist = '';
            }
            else {
              
                var blanknotallowedmsg = "To continue, enter a Nickname or create an automatic player. Special characters are not allowed.";
                setInformationMode(blanknotallowedmsg);

                var nofunction = "";
                $('#hdnRemoteFunctionNParam').val(nofunction);

                $('#txtCustomNick').val('');
                playerExist = '';
            }



        });

    function blockincomingplayers(timebeforeblock)
    {

        var arrgkey = $('#hdnArrGameKey').val();
        //0: GAME NAME
        //1: GAME SESSIONID
        var sessionidgame = arrgkey[1];

        var timerblockincomingplyrs = setInterval(function () {           
            timebeforeblock--;      
            if (timebeforeblock == -1) {
           
                clearInterval(timerblockincomingplyrs);
                timerblockincomingplyrs = undefined;

                //BLOCK INCOMING PLAYERS AFTER 5 seconds

                var gamemodeID = "";
                var gamemode = "";
                gamemode = $('#spGameMode').text();
                //5: GAME MODE LINE.
                //6: GAME MODE BINGO.
                if (gamemode == " Line") {
                 
                    gamemodeID = "5";
                }

                if (gamemode == " Bingo") {
           
                    gamemodeID = "6";
                }

                $.ajax({
                    url: "/TTTBingo/BlockIncomingPlayers",
                    xhrFields: { withCredentials: true },
                    crossDomain: true,
                    data: {
                        bingomode: gamemodeID,
                        gamenewsid: sessionidgame
                    },
                    type: "POST",
                    dataType: "json",
                    success: function (result, status, xhr) {
                        var resultFromServer = xhr.getResponseHeader("BlockPlayersResults");
                  


                        hidepopdiv();

                        $('#btnNextQuestion').show();


                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        //alert('Unexpected error: ' + 'Code: blockincomingplayers' + ' Status: ' + textStatus + " .Details: " + errorThrown);
                    }
                });


            }
        }, 1000);
 
    }

        function playerscount(gameid) {

            var currentquestionId = "";

            $.ajax({
                url: "/TTTBingo/GetPlayersTotal",
                xhrFields: {withCredentials: true },
                crossDomain: true,
                data: {
                    curidgamesession: gameid },
                type: "GET",
                dataType: "json",
                success: function (result, status, xhr) {

                    var resultFromServer = xhr.getResponseHeader("PlayersCountResults");

                    console.log('NUMBER OF PLAYERS: ' + resultFromServer);

                    //playerscount;gamestatus;PLAYERN587_1;PLAYERN112_1;PLAYERZ112_1
                    var arr67 = resultFromServer.split(";");      
                    var count = arr67[0];               
                    var currentgamestatus = arr67[1];   
                    
                    //console.log('PLAYERS COUNT: ' + count);

                    var newtr_playerscount = '';
                   
                    if (resultFromServer != null && resultFromServer != "") {
                        //Player's monitor
                        $('#spPlayerCountPL').text(count);

                        //ADMIN's monitor
                        $('#spPlayerCountADM').text(count);

                        if ($('#tbAdmin').is(':visible')) {
                        
                     
                            if (count == "2" && currentgamestatus == "activated") {

                                $('#dvAdmin').hide();                         
                                $('#modGameOverSummary').show();

                                if (arr67[2] != "NoWinnersTotal") {

                                    for (var f = 3; f < arr67.length; f++) {

                                        //TODO SPLIT STRING MAY BE NECESSARY
                                        var arronlyplayer = arr67[f].split("_");
                                        var winneroncount = arronlyplayer[0];

                                        newtr_playerscount += "<tr><td>" + winneroncount + "</td></tr>";
                                        $('#tbGameOverSummary').html(newtr_playerscount);
                                    }

                                }
                                else {
                                    newtr_playerscount += "<tr><td>" + "No winners for this round." + "</td></tr>";
                                    $('#tbGameOverSummary').html(newtr_playerscount);
                                }

                                clearInterval(timerPlayersCount);
                                timerPlayersCount = undefined;

                            }
                            else {
                               
                                var countsec2admin = 1;
                                getplayerscount(countsec2admin, gameid);
                            }
                        }
                        else
                        {

                            if ($('#div1').is(':visible')) {

                                if (count == "2" && currentgamestatus == "activated") {

                                    if ($('#dvGameOverPlayer').is(':visible')) {
                               
                                        $('#div1').hide();
                                        $('#dvGameOverPlayer').hide();
                                        $('#dvGameOverPlayerWon').hide();
                                        $('#dvGameOverOnePlayer').show();                                      

                                        
                                    }
                                    else {

                                        if ($('#dvGameOverPlayerWon').is(':visible')) {
                                    
                                            $('#div1').hide();
                                            $('#dvGameOverPlayer').hide();
                                            $('#dvGameOverPlayerWon').hide();
                                            $('#dvGameOverOnePlayer').show();

                                            
                                        }
                                        else {
                                  
                                            $('#div1').hide();
                                            $('#dvGameOverOnePlayer').show();

                                           
                                        }
                                    }

                                    clearInterval(timerPlayersCount);
                                    timerPlayersCount = undefined;
                          
                                }
                                else {
               
                                    var countsec2admin = 1;
                                    getplayerscount(countsec2admin, gameid);
                                }
                            }
                            else {
         
                                clearInterval(timerPlayersCount);
                                timerPlayersCount = undefined;
                                
                            }                  
                        }
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert('Unexpected error: ' + 'Code: playerscount' + ' Status: ' + textStatus + " .Details: " + errorThrown);
                }
            });
        }

        function playersmonitor(idgame) {

            var currentquestionId = "";
            var arrlen31 = 0;

            $.ajax({
                url: "/TTTBingo/GetMonitor",
                xhrFields: {withCredentials: true },
                crossDomain: true,
                data: {
                    curgamesesid: idgame
                },
                type: "GET",
                dataType: "json",
                success: function (result, status, xhr) {

                    var resultFromServer = xhr.getResponseHeader("MonitorResults");             
                    console.log('MONITOR: ' + resultFromServer);
                    //NoPlayersYet

                    if (resultFromServer !="NoPlayersYet") {
                        var arr = resultFromServer.split(";");
                        arrlen31 = arr.length;
                        var player1val = arr[0];
                        var player2val = arr[1];
                        var player3val = arr[2];

                        $("#mostrecentPlayer1").text(player1val);
                        $("#mostrecentPlayer2").text(player2val);
                        $("#mostrecentPlayer3").text(player3val);
                    }


                    var monsec2 = 1;
                    refreshplayersmon(monsec2, idgame);
        
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert('Unexpected error: ' + 'Code: playersmonitor' + ' Status: ' + textStatus + " .Details: " + errorThrown);
                }
            });
        }


        //CHECKS WHETHER INFORMATION FROM ADMIN SIDE HAS COME.
        function getnextwinnerlist() {

            var hdnsessionid = $('#hdnGameSessionIDplayer').val();

            //var wegotwinners = 0;
            var currentquestionId = "";

            //****NEW: CHECK WHETHER PLAYERID STILL IN ITS HIDDEN FIELD
            var hiddenTHISplayerId = $('#hdnNewPlayerId').val();
          

            $.ajax({
                url: "/TTTBingo/GetNexWinners",
                xhrFields: {withCredentials: true },
                crossDomain: true,
                data: {
                        checkplayerforprize: hiddenTHISplayerId,
                        gameplayersid: hdnsessionid
                       },
                type: "GET",
                dataType: "json",
                success: function (result, status, xhr)
                {

                    var resultFromServer = xhr.getResponseHeader("NextWinnersAdminResults");



                    //console.log('From NextWinnersAdminResults: ' + resultFromServer);

                    //RESULT FROM SERVER SAMPLE:
                    //2;48;100;PlayerY673_1|100;PlayerF50_1|100;PlayerV673_1|
                    //2;Notawinner;100;PlayerY673_1|100;PlayerF50_1|100;PlayerV673_1|

                    var officialnexwinnerls1;
                    var winnersnoquestions;
                    var winnerscore;
                    var arrwinnernick;
                    

                    var officialnexwinnerls1 = resultFromServer.split("|");

                    var firstwinnerdata = officialnexwinnerls1[0].split(";");

                    var isthisplayerawinner = firstwinnerdata[1];
                    //console.log('DID THIS PLAYER WON?: ' + isthisplayerawinner);

                    var arrlen = officialnexwinnerls1.length;
                    var prizetypeofficial = firstwinnerdata[0];
                    var newtr_officialwin = '';

                    if (resultFromServer != null && resultFromServer != "")
                    {
                        //console.log('INCOMING CODE IS: ' + resultFromServer);

                        if (isthisplayerawinner == "NoWinnersOrError" && prizetypeofficial == "11")
                        {
                            //console.log('GOT NOWINNERSORERRORS CODE 11: ' + resultFromServer);

                            var underanalysismsg = "There are no winners for this round. Keep playing!!";
                            setInformationModePlayer(underanalysismsg);

                            var nofunction = "";
                            $('#hdnRemoteFunctionNParam').val(nofunction);

                            //STOPS THE TIMER FOR "NEXT QUESTION IN 5 SECONDS..."
                            //console.log('STOPPED TIMER 240 SECONDS.');
                            clearInterval(timerhidecurquestion23);
                            timerhidecurquestion23 = undefined; 


                        }
                        else
                        {

                            if (isthisplayerawinner == "Notawinner" && prizetypeofficial == "11") {

                                //console.log('GOT Notawinner CODE 11: ' + resultFromServer);

                                var underanalysismsg = "There are no winners for this round. Keep playing!!";
                                setInformationModePlayer(underanalysismsg);

                                var nofunction = "";
                                $('#hdnRemoteFunctionNParam').val(nofunction);

                                //STOPS THE TIMER FOR "NEXT QUESTION IN 5 SECONDS..."
                                //console.log('STOPPED TIMER 240 SECONDS.');
                                clearInterval(timerhidecurquestion23);
                                timerhidecurquestion23 = undefined;

                            } else {

                                if (prizetypeofficial == "2") {
                                    //RETURN VALUE SAMPLE:
                                    //2;48;100;PlayerY673_1|100;PlayerF50_1|100;PlayerV673_1|
                                    //2;Notawinner;100;PlayerY673_1|100;PlayerF50_1|100;PlayerV673_1|


                                    //HIDE BUTTON(LINE OR BINGO)
                                    $('#btnGotLine').hide();
                                    $('#btnGotBingo').hide();

                                    //HIDES CURRENT QUESTION AND TIMER PANEL FOR THE PLAYER
                                    $('#div3Player').hide();

                                    //STOPS WAITING FOR WINNERS PANEL FROM ADMIN SIDE
                                    $('#trResultsCheck').hide();

                                    //STOPS THE TIMER FOR "NEXT QUESTION IN 5 SECONDS..." 
                                    clearInterval(timerhidecurquestion23);
                                    timerhidecurquestion23 = undefined;


                                    $('#modNexWinnersFromAdminContainer').show();
                                    //*********** APPLYING NEW SELECTED SKIN ***************************

                               

                                    //CURRENT CELL CONTROL NAME
                                    var mdwinners = document.getElementById('modNexWinnersFromAdminContainer');

                                    //ALL CSS CLASSES APPLIED TO THIS CELL
                                    var controlclsdata2 = mdwinners.className;

                                   
                                    // ******* THIS IS THE PREVIOUSLY APPLIED dvCell CSS. *****
                                    var ret = controlclsdata2.replace('modNexWinnersFromAdminContainer', '');
                                    //modBackColorNWinner_Default

                                    //NEW STYLE TO APPLY
                                    var compoundcls = ret.split("_");
                                    var baseclsname = compoundcls[0];
                                    var prevclsname = compoundcls[1];

                                    var himgcls = document.getElementById('imgBingoHeader');
                                    var controlclsdata3 = himgcls.className;
                                    var arrclassname = controlclsdata3.split("_");
                                    var clstoapply = baseclsname + "_" + arrclassname[1];

                                    //console.log('PREV. CLASS: ' + prevclsname + ' NEXT CLASS: ' + arrclassname[1] + ' PREVIOUS SKIN: ' + ret);

                                    //$('#modNexWinnersFromAdminContainer').removeClass(ret);
                                    //$('#modNexWinnersFromAdminContainer').addClass(clstoapply);

                                    //mnQAsked
                                    $('#mnQAsked').show();



                                    //*********** END APPLYING NEW SELECTED SKIN ***********
                                    confetti.start();

                                    //2;48;100;PlayerY673_1|100;PlayerF50_1|100;PlayerV673_1|



                                    //******* FIX TO DO: NoWinnersOrError, 
                                    //DISPLAY MESSAGE No winners for this round.Keep playing!



                                    for (var h = 0; h < arrlen - 1; h++) {

                                        //TODO SPLIT STRING MAY BE NECESSARY

                                        var arrwinnerlsofficial = officialnexwinnerls1[h].split(";");


                                        if (h == 0) {
                                            winnerscore = arrwinnerlsofficial[2];
                                            arrwinnernick = arrwinnerlsofficial[3].split("_");
                                            winnersnoquestions = arrwinnernick[0];
                                        }
                                        else {
                                            winnerscore = arrwinnerlsofficial[0];
                                            arrwinnernick = arrwinnerlsofficial[1].split("_");
                                            winnersnoquestions = arrwinnernick[0];
                                        }

                                        newtr_officialwin += "<tr><td class='tdscoring_" + arrclassname[1] + "'><div><span class='count'>" + winnerscore + "</span></div></td>\
                                    <td><div class='dvProgressBar_" + arrclassname[1] + "'><div class='winnerprogress_" + arrclassname[1] + "'></div><div class='winnerProgressBar'></div></div></td>\
                                    <td class='tdofficialwinner_" + arrclassname[1] + "'>" + winnersnoquestions + "</td>\
                                    </tr>";

                                        $('#tbWinnerOfficial').html(newtr_officialwin);
                                    }

                                    AwesomeCountDown();
 


                                    //ACTIVATES TIMER- HIDE WINNERS PANEL AFTER 10 SECONDS.
                                    //SHOWS WAITING FOR NEXT QUESTION IF PREVIOUS PRIZE WAS LINE.
                                    //SHOWS THANK YOU FOR PARTICIPATING IF IT WAS BINGO.

                                    //var sec45 = 12;
                                    //$('#modNexWinnersFromAdminContainer span').text(12);
                                    //hidewinnerspanel(sec45);

                                }
                                else {
                                    if (prizetypeofficial == "4") {

                                        //STOPS THE TIMER FOR "NEXT QUESTION IN 5 SECONDS..."
                                        clearInterval(timerhidecurquestion23);
                                        timerhidecurquestion23 = undefined;


                                        //HIDE BUTTON(LINE OR BINGO)
                                        $('#btnGotLine').hide();
                                        $('#btnGotBingo').hide();

                                        //HIDES CURRENT QUESTION AND TIMER PANEL FOR THE PLAYER
                                        $('#div3Player').hide();

                                        //STOPS WAITING FOR WINNERS PANEL FROM ADMIN SIDE
                                        $('#trResultsCheck').hide();

                                        $('#modNexWinnersFromAdminContainer').show();

                                        //*********** APPLYING NEW SELECTED SKIN ***************************

                                        //PREVIOUS STYLE
                                        //var curdvcell = dvids + indexer;

                                        //CURRENT CELL CONTROL NAME
                                        var mdwinners2 = document.getElementById('modNexWinnersFromAdminContainer');

                                        //ALL CSS CLASSES APPLIED TO THIS CELL
                                        var controlclsdata4 = mdwinners2.className;

                                        //APPLY replace('col-sm '...) TO REMOVE col-sm, LEAVING ONLY THE NAME OF THE PREVIOUSLY APPLIED CLASS:

                                        // ******* THIS IS THE PREVIOUSLY APPLIED dvCell CSS. *****
                                        var ret2 = controlclsdata4.replace('modNexWinnersFromAdminContainer', '');
                                        //modBackColorNWinner_Default




                                        //NEW STYLE TO APPLY
                                        var compoundcls2 = ret2.split("_");
                                        var baseclsname2 = compoundcls2[0];


                                        var himgcls2 = document.getElementById('imgBingoHeader');
                                        var controlclsdata5 = himgcls2.className;
                                        var arrclassname2 = controlclsdata5.split("_");
                                        var clstoapply2 = baseclsname2 + arrclassname2[1];

                                        //console.log('PREV STYLE: ' + ret2 + ' NEXT STYLE: ' + clstoapply2);

                                        //$('#modNexWinnersFromAdminContainer').removeClass(ret2);
                                        //$('#modNexWinnersFromAdminContainer').addClass(clstoapply2);

                                        //mnQAsked
                                        $('#mnQAsked').show();


                                        //*********** END APPLYING NEW SELECTED SKIN ***********




                                        confetti.start();

                                        if (isthisplayerawinner != "Notawinner") {

                                            $('#btnContinuePlayer').hide();
                                            $('#btnLeavePlayer').hide();

                                            $('#btnPlayerWonBingo').show();
                                            $('#h3PlayerWonMessage').show();


                                        }
                                        else {

                                            $('#btnContinuePlayer').show();
                                            $('#btnLeavePlayer').show();

                                        }

                                        //4;48;100;PlayerY673_1|100;PlayerF50_1|100;PlayerV673_1|

                                        for (var xh = 0; xh < arrlen - 1; xh++) {

                                            //TODO SPLIT STRING MAY BE NECESSARY

                                            var arrwinnerlsofficial = officialnexwinnerls1[xh].split(";");


                                            if (xh == 0) {
                                                winnerscore = arrwinnerlsofficial[2];
                                                arrwinnernick = arrwinnerlsofficial[3].split("_");
                                                winnersnoquestions = arrwinnernick[0];
                                            }
                                            else {
                                                winnerscore = arrwinnerlsofficial[0];
                                                arrwinnernick = arrwinnerlsofficial[1].split("_");
                                                winnersnoquestions = arrwinnernick[0];
                                            }

                                            newtr_officialwin += "<tr><td class='tdscoring_" + arrclassname2[1] + "'><div><span class='count'>" + winnerscore + "</span></div></td>\
                                        <td><div class='dvProgressBar_" + arrclassname2[1] + "'><div class='winnerprogress_" + arrclassname2[1] + "'></div><div class='winnerProgressBar'></div></div></td>\
                                        <td class='tdofficialwinner_" + arrclassname2[1] + "'>" + winnersnoquestions + "</td>\
                                        </tr>";


                                            $('#tbWinnerOfficial').html(newtr_officialwin);
                                        }


                                        AwesomeCountDown();


                                        //ACTIVATES TIMER- HIDE WINNERS PANEL AFTER 10 SECONDS.
                                        //SHOWS WAITING FOR NEXT QUESTION IF PREVIOUS PRIZE WAS LINE.
                                        //SHOWS THANK YOU FOR PARTICIPATING IF IT WAS BINGO.

                                        //var sec78 = 12;
                                        //$('#modNexWinnersFromAdminContainer span').text(12);
                                        //hidewinnerspanelBingo(sec78, isthisplayerawinner);


                                    }


                                }

                            }

                        }

                    }

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert('Unexpected error: ' + 'Code: getnextwinnerlist' + ' Status: ' + textStatus + " .Details: " + errorThrown);
                 }
            });
            
            //return wegotwinners;
        }

        //--------- POPDIV ADMIN -----------------------

        function hidepopdiv() {
            //$('#dvAdmin').show();
            $('#dvAdmin').removeClass('fullscreen-container');
            $("#hCustomMessage").text('');
            $('#hCustomMessage').removeClass('hCustomMsgConfirm');
            $('#hCustomMessage').addClass('hCustomMsgPopup');
            $("#btnDialogOK").hide();
            $("#btnDialogCancel").hide();
            $('#dvSpinMsg').removeClass('text-danger');
            $('#dvSpinMsg').addClass('text-warning');
            $('#dvSpinMsg').removeClass('dvSpinMsgConfirm');
            $('#dvSpinMsg').addClass('dvSpinMsg');
            $("#dvSpinMsg").hide();
            $('#popdiv').removeClass('popdivInfo');
            $('#popdiv').removeClass('popdivWarning');
            $('#popdiv').removeClass('popdivConfirm');
            $('#popdiv').hide();
            //$('#dvPlayersReady').show();
        }

        function setConfirmationMode(textConfirmation) {
                $('#dvPlayersReady').hide();
                $('#dvAdmin').addClass('fullscreen-container');
                $('#popdiv').show();

                //POP UP CONFIRM DIALOG MODE...
                $('#popdiv').addClass('popdivConfirm');

                $("#dvSpinMsg").show();           
                $('#dvSpinMsg').removeClass('text-warning');
                $('#dvSpinMsg').addClass('text-danger');

                $('#dvSpinMsg').removeClass('dvSpinMsg');
                $('#dvSpinMsg').addClass('dvSpinMsgConfirm');

                $("#btnDialogOK").show();
                $("#btnDialogCancel").show();

                $("#hCustomMessage").show();
                $('#hCustomMessage').removeClass('hCustomMsgPopup');
                $('#hCustomMessage').addClass('hCustomMsgConfirm');
                $("#hCustomMessage").text(textConfirmation);
                $(".fullscreen-container").fadeTo(200, 1);
        }

        $('#btnDialogCancel').click(function () {

            var canceloperation = $('#hdnCancelOperations').val();

            hidepopdiv();

            switch (canceloperation) {
                case "ContinuePlay":

                    $('#dvAdmin').hide();
                    $('#dvGameOver').show();

                    break;

                case "SetCorpSkin":

                    $('#modGameTheme').show();

                    break;

                case "SetDefSkin":

                    $('#modGameTheme').show();

                    break;

                case "CancelConfirmWinner":

                    $('#modGameTheme').hide();

                    break;
            }


        });

        $('#btnDialogOK').click(function () {

            var functionarraydata = $('#hdnRemoteFunctionNParam').val();
            //console.log('REMOTE FUNCTION INFO: ' + functionarraydata);

            if (functionarraydata!="") {
                //CONFIRM POP UP MODE
                var arrokdialog = functionarraydata.split(";");

                //console.log('FUNCTION NAME: ' + arrokdialog[0] + 'PARAM NAME: ' + arrokdialog[1]);

                var functiontoexecute = arrokdialog[0];
                var paramKK = arrokdialog[1];

                //Create the function call from function name and parameter.
                var funcCall;


                if (paramKK=='undefined') {
                    funcCall = functiontoexecute + "();";
                }
                else {
                    funcCall = functiontoexecute + "('" + paramKK + "');";
                }


                //console.log('FUNCTION TO EXECUTE: ' + funcCall);

                //Call the function
                eval(funcCall);
            }
            else {
                //INFORMATION/ERROR POP UP MODE
                //CLOSE THIS DIALOG WINDOW(popdiv)

                //GET CURRENTLY APPLIED STYLE(INFO OR ERROR?)
                var dvspincontrol = document.getElementById('dvSpinMsg');
                var clsdvspin = dvspincontrol.className;
                
                //spinner-border text-info dvSpinMsgConfirm


                var dvspinclsset = clsdvspin.replace('spinner-border ', '');
                //text-info dvSpinMsgConfirm

                var arrdvspinclsset = dvspinclsset.split(" ");
                var spincls1 = arrdvspinclsset[0];
                var spincls2 = arrdvspinclsset[1];

                //console.log('CURRENT DVSPIN CLS1 : ' + spincls1 + ' CURRENT DVSPIN CLS2 : ' + spincls2);


                //$('#dvAdmin').show();       
                $('#dvAdmin').removeClass('fullscreen-container');
                //$("#hCustomMessage").text('');
                //BOTH INFO AND ERROR MODE USE THIS
                $('#hCustomMessage').removeClass('hCustomMsgConfirm');
                $('#hCustomMessage').addClass('hCustomMsgPopup');
                $('#btnDialogOK').removeClass('btnDialogOKInfo');
                $('#btnDialogOK').addClass('btnDialogOK');
                $("#btnDialogOK").hide();
                $("#btnDialogCancel").hide();
                $('#dvSpinMsg').removeClass('text-info');
                $('#dvSpinMsg').removeClass('dvSpinMsgConfirm');
                $('#dvSpinMsg').addClass('text-warning');
                $('#dvSpinMsg').addClass('dvSpinMsg');
                $("#dvSpinMsg").hide();
                $('#popdiv').removeClass('popdivInfo');
                $('#popdiv').hide();
                //$('#dvPlayersReady').show();
    
            }

        });

        function ConfirmDialogBingo(skinselected, functionOKbutton, confirmMsg) {

            var remotefuncparam = functionOKbutton + ";" + skinselected;
            setConfirmationMode(confirmMsg);
            $('#hdnRemoteFunctionNParam').val(remotefuncparam);
        }

        function setWarningMode(warningMsg) {

            $('#dvPlayersReady').hide();
            $('#dvAdmin').addClass('fullscreen-container');
            $('#popdiv').show();

            //POP UP WARNING MODE...
            $('#popdiv').addClass('popdivWarning');

            $("#dvSpinMsg").show();
            $('#dvSpinMsg').removeClass('text-danger');
            $('#dvSpinMsg').addClass('text-warning');

            $('#dvSpinMsg').removeClass('dvSpinMsgConfirm');
            $('#dvSpinMsg').addClass('dvSpinMsg');


            $("#btnDialogOK").hide();
            $("#btnDialogCancel").hide();

            $("#hCustomMessage").show();
            $('#hCustomMessage').removeClass('hCustomMsgConfirm');
            $('#hCustomMessage').addClass('hCustomMsgPopup');
            $("#hCustomMessage").text(warningMsg);
            $(".fullscreen-container").fadeTo(200, 1);
        }

        function setInformationMode(infoMsg) {

           //POP UP INFORMATION MODE...

            $('#dvPlayersReady').hide();
            $('#dvAdmin').addClass('fullscreen-container');
            $('#popdiv').show();

            $('#popdiv').addClass('popdivInfo');

            $("#dvSpinMsg").show();
            $('#dvSpinMsg').removeClass('text-warning');
            $('#dvSpinMsg').addClass('text-info');

            $('#dvSpinMsg').removeClass('dvSpinMsg');
            $('#dvSpinMsg').addClass('dvSpinMsgConfirm');

            $("#btnDialogOK").show();
            $('#btnDialogOK').removeClass('btnDialogOK');
            $('#btnDialogOK').addClass('btnDialogOKInfo');

            $("#hCustomMessage").show();
            $('#hCustomMessage').removeClass('hCustomMsgPopup');
            $('#hCustomMessage').addClass('hCustomMsgConfirm');
            $("#hCustomMessage").text(infoMsg);
            $(".fullscreen-container").fadeTo(200, 1);
        }



        //--------- POPDIV PLAYER -----------------------

        function hidepopdivplayer() {

            // **************** HIDE POPDIVPLAYER ***************
            //$('#div1').show();
            $('#div1').removeClass('fullscreen-containerplayer');
            $("#hCustomMessageplayer").text('');

            $('#hCustomMessageplayer').removeClass('hCustomMsgplayerConfirm');
            $('#hCustomMessageplayer').addClass('hCustomMsgplayerPopup');

            $('#btnDialogOKplayer').removeClass('btnDialogOKplayerInfo');
            $('#btnDialogOKplayer').addClass('btnDialogOKplayer');

            $("#btnDialogOKplayer").hide();
            $("#btnDialogCancelplayer").hide();

            $('#dvSpinMsgplayer').removeClass('text-info');
            $('#dvSpinMsgplayer').removeClass('dvSpinMsgplayerConfirm');

            $('#dvSpinMsgplayer').addClass('text-warning');
            $('#dvSpinMsgplayer').addClass('dvSpinMsgplayer');

            $("#dvSpinMsgplayer").hide();

            $('#popdivplayer').removeClass('popdivplayerInfo');
            $('#popdivplayer').hide();

            //$('#dvPlayersReadyPlayer').show();
            //$('#dvYourCard').show();
            //$('#dvBingoCard').show();
            //$('#tbBingoControls').show();
        }

        $('#btnDialogOKplayer').click(function () {

                    var functionarraydata = $('#hdnRemoteFunctionNParam').val();
                    //console.log('REMOTE FUNCTION INFO: ' + functionarraydata);

                    if (functionarraydata != "") {
                        //CONFIRM POP UP MODE
                        var arrokdialog = functionarraydata.split(";");

                        //console.log('FUNCTION NAME: ' + arrokdialog[0] + 'PARAM NAME: ' + arrokdialog[1]);

                        var functiontoexecute = arrokdialog[0];
                        var paramKK = arrokdialog[1];

                        //Create the function call from function name and parameter.
                        var funcCall;


                        if (paramKK == 'undefined') {
                            funcCall = functiontoexecute + "();";
                        }
                        else {
                            funcCall = functiontoexecute + "('" + paramKK + "');";
                        }


                        //console.log('FUNCTION TO EXECUTE: ' + funcCall);

                        //Call the function
                        eval(funcCall);
                    }
                    else {
                        //INFORMATION/ERROR POP UP MODE
                        //CLOSE THIS DIALOG WINDOW(popdiv)

                        //GET CURRENTLY APPLIED STYLE(INFO OR ERROR?)
                        var dvspincontrol = document.getElementById('dvSpinMsgplayer');
                        var clsdvspin = dvspincontrol.className;

                        //spinner-border text-info dvSpinMsgConfirm


                        var dvspinclsset = clsdvspin.replace('spinner-border ', '');
                        //text-info dvSpinMsgConfirm

                        var arrdvspinclsset = dvspinclsset.split(" ");
                        var spincls1 = arrdvspinclsset[0];
                        var spincls2 = arrdvspinclsset[1];

                        //console.log('CURRENT DVSPIN CLS1 : ' + spincls1 + ' CURRENT DVSPIN CLS2 : ' + spincls2);

                        hidepopdivplayer();

                    }

                });

        function setInformationModePlayer(infoMsg) {

            //POP UP INFORMATION MODE...

            $('#dvPlayersReadyPlayer').hide();
            $('#dvYourCard').hide();
            $('#dvBingoCard').hide();
            $('#tbBingoControls').hide();


            $('#div1').addClass('fullscreen-containerplayer');
            $('#popdivplayer').show();

            $('#popdivplayer').addClass('popdivplayerInfo');

            $("#dvSpinMsgplayer").show();
            $('#dvSpinMsgplayer').removeClass('text-warning');
            $('#dvSpinMsgplayer').addClass('text-info');

            $('#dvSpinMsgplayer').removeClass('dvSpinMsgplayer');
            $('#dvSpinMsgplayer').addClass('dvSpinMsgplayerConfirm');

            $("#btnDialogOKplayer").show();
            $('#btnDialogOKplayer').removeClass('btnDialogOKplayer');
            $('#btnDialogOKplayer').addClass('btnDialogOKplayerInfo');

            $("#hCustomMessageplayer").show();
            $('#hCustomMessageplayer').removeClass('hCustomMsgplayerPopup');
            $('#hCustomMessageplayer').addClass('hCustomMsgplayerConfirm');
            $("#hCustomMessageplayer").text(infoMsg);
            $(".fullscreen-containerplayer").fadeTo(200, 1);


        }



        //********* SPLASH SCREEN ***********************

        $('#btnAcceptTerms').click(function () {

            $('#dvGeneralRegistration').show();
            $('#dvGeneralRegistration').removeClass('fullscreen-container');
            $('#dvGeneralRegistration').addClass('center');
            $('#dvGeneralRegistration').addClass('dvDialog');          
            $('#dvEYLOGO').show();
            $('#dvTerms').hide();    
            $('#h6CustomMsg').show();         
            $('#btnReadTerms').show();
            $('#btnRefuseTerms').hide();  
            $('#splashWelcome').hide();


            $('#imgBingoHeader').show();      
            $('#hPlayerRegTitle').show();        
            $('#lblCustomNick').show();      
            $('#txtCustomNick').show();         
            $('#lblSetAutoPlayer').show();  
            $('#chkAutomaticNick').show();
            $('#btnRegisterPlayer').show();
        });

        //btnReadTerms
        $('#btnReadTerms').click(function () {

            //dvEYLOGO
            $('#dvEYLOGO').hide();
            //dvTerms
            $('#dvTerms').show();
            //h6CustomMsg
            $('#h6CustomMsg').hide();
            //btnReadTerms
            $('#btnReadTerms').hide();
            //btnRefuseTerms
            $('#btnRefuseTerms').show();
        });

        //btnRefuseTerms
        $('#btnRefuseTerms').click(function () {
            $('#dvGeneralRegistration').show();
            $('#dvGeneralRegistration').removeClass('fullscreen-container');
            $('#dvGeneralRegistration').addClass('center');
            $('#dvGeneralRegistration').addClass('dvDialog');
            $('#dvEYLOGO').show();
            $('#dvTerms').hide();
            $('#h6CustomMsg').show();
            $('#btnReadTerms').show();
            $('#btnRefuseTerms').hide();
            $('#splashWelcome').hide();

            $('body').removeClass('bd_Default');
            $('body').addClass('bd_Refuse');
            $('#dvGeneralRegistration').hide();
        });



        function setplayerskin(namedskin) {

            //console.log('YOUR NEW SKIN IS: ' + namedskin);

            switch (namedskin) {
                case "corporatetheme":

                    $('body').removeClass('bd_Default');
                    $('#imgBingoHeader').removeClass('imgBingoHeader_Default');
                   

                    $('body').addClass('bd_Corp');
                    $('#imgBingoHeader').addClass('imgBingoHeader_Corp');    


                    //A TIMER, IN ORDER TO GIVE IT TIME TO REFRESH
                    //AND GET THE CURRENT SELECTED SKIN TO APPLY.
                    var tmrbeforestylingselectedcell = 2;               
                    setprevselectedcellsdyn(tmrbeforestylingselectedcell);

                    break;


                case "defaulttheme": 
                    $('body').removeClass('bd_Corp');
                    $('#imgBingoHeader').removeClass('imgBingoHeader_Corp');

                    $('body').addClass('bd_Default'); 
                    $('#imgBingoHeader').addClass('imgBingoHeader_Default');   

                    var tmrbeforestylingselectedcell = 2;
                    setprevselectedcellsdyn(tmrbeforestylingselectedcell);

                    break;
            }

            
        }
        
        function getactivationcodenextq() {

            var cursessionid = $('#hdnGameSessionIDplayer').val();

            var currentquestionId = "";

            $.ajax({
               url: "/TTTBingo/GetActivationCodeNexQ",
               xhrFields: {withCredentials: true },
               crossDomain: true,
               data: {
                   nextqplayerbysessionid: cursessionid
                       },
               type: "GET",
               dataType: "json",
               success: function (result, status, xhr) {

                   var resultFromServer = xhr.getResponseHeader("ActivationCodeNextQ");
                   //console.log('GET ACTIVATION CODE NEXT QUESTION: ' + resultFromServer);

                   if ($('#dvGameOverPlayer').is(':visible')) {
           
                   }
                   else {                     
               
                       if (resultFromServer != null && resultFromServer != "KeepChecking" && resultFromServer != "") {
                           $('#dvNextQContainer').hide();
                           $('#div2').show();
                           if ($('#div2').is(':visible')) {
                               //console.log('BEFORE SPINNING FOR PLAYER: ' + resultFromServer);
                               var secpl = 5;
                               $('#div2 span').text(5);
                               SpinThatWheelPlayer(secpl);
                           }
                       }
                       else {
                           var secplayer2 = 1;
                           getnextqplayer(secplayer2);
                       }
                   }

               },
               error: function (XMLHttpRequest, textStatus, errorThrown) {
                   //alert('Unexpected error: ' + 'Code: getactivationcodenextq' + ' Status: ' + textStatus + " .Details: " + errorThrown);
                            }
            });

        }

        function getnextquestionevent() {

           var getnextqbysid =  $('#hdnGameSessionIDplayer').val();

            clearInterval(timerGetNextQPlayer);
            timerGetNextQPlayer = undefined;

            var currentquestionId = "";

            $.ajax({
                url: "/TTTBingo/GetNexQuestion",
                xhrFields: {withCredentials: true },
                crossDomain: true,
                data: {
                    nexquestionbygameid: getnextqbysid
                },
                type: "GET",
                dataType: "json",
                success: function (result, status, xhr) {
                                                                  //NextQResults
                    var resultFromServer = xhr.getResponseHeader("NextQResults");
                   
                    var arr = resultFromServer.split(";");
             
                    var bingomode = arr[0];      
                    var nextquestion = arr[1];
                    var btntimer = 45;

                    if (resultFromServer != "Nomorequestions")
                    {
                       
                        $("#h3QuestionTextPlayer").text(nextquestion);

                        //DISPLAYS ON SCREEN COUNTDOWN
                        //SHOWS LINE/BINGO BUTTON FOR 45 SECONDS.
                        //HIDES LINE/BINGO BUTTON  AFTER THAT TIME.

                        if (bingomode == "5") {
                            $('#btnGotLine').show();
                            $('#spBtnLineTimer').show();
                           
                            $('#spBtnLineTimer').text(45);
                            timerhidebtn("btnline", btntimer);
                        }


                        if (bingomode == "6") {
                            $('#btnGotBingo').show();
                            $('#spBtnBingoTimer').show();
                                                                             
                            $('#spBtnBingoTimer').text(45);
                            timerhidebtn("btnbingo",btntimer); 
                        }

                        //SHOWS CURRENT QUESTION FOR 240 SECONDS.
                        //HIDES CURRENT QUESTION AFTER THAT TIME.
                        var seccurquestions = 240;
                        $('#div3Player span').text(240);
                        timerhidecurquestion(seccurquestions); 
                    }
            },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert('Unexpected error: ' + 'Code: getnextquestionevent' + ' Status: ' + textStatus + " .Details: " + errorThrown);
            }
            });

}

        function activatenextq()
        {

            //console.log('ACTIVATENEXQUESTION HAS BEEN CALLED.');

            //RETRIEVE GAME SESSION ID 
            var sessionidforactivation = $('#hdnGameSessionIDplayer').val();

            var currentquestionId = "";

            $.ajax({
                url: "/TTTBingo/ActivateNexQuestion",
                xhrFields: {withCredentials: true },
                crossDomain: true,
                data: {
                    nexquestionforgamesession: sessionidforactivation
                },
                type: "POST",
                dataType: "json",
                success: function (result, status, xhr)
                {

                    var resultFromServer = xhr.getResponseHeader("ActivateQResults");

                    //console.log('SET ACTIVATION CODE NEXTQ:' + resultFromServer);

                    var secplayer1 = 1;
                    getnextqplayer(secplayer1);

                },
                error: function (XMLHttpRequest, textStatus, errorThrown)
                {
                                    //alert('Unexpected error: ' + 'Code: activatenextq' + ' Status: ' + textStatus + " .Details: " + errorThrown);
                }
            });

        }

        function gotLine(myline) {
  

            var playerId = $('#hdnNewPlayerId').val();
            var gameidsess = $('#hdnGameSessionIDplayer').val();

            var linetosend = playerId + ";" + myline;

            $.ajax({
                url: "/TTTBingo/LineCheck",
                xhrFields: { withCredentials: true },
                crossDomain: true,
                data: {
                    playerlinecard: linetosend,
                    gameid: gameidsess
                },
                type: "POST",
                dataType: "json",
                success: function (result, status, xhr) {

                    var resultFromServer = xhr.getResponseHeader("LineCardPlayerResults");
                    //EXAMPLE:
                    //2; LINE1; PlayerP77_1; 2202; Goni_False; Sharepoint101_False; Fabiola_False; NA_False; NA_False; NA_False
                    //2; LINE2; PlayerF76_1; 2203; NA_False; NA_False; NA_False; Sharepoint101_False; Jonatan_False; Fabiola_False;

                   

                    if (resultFromServer != "AlreadyWonClaimedPrize") {
                        

                        var underanalysismsg = "Your card is under analysis. Please wait.";
                        setInformationModePlayer(underanalysismsg);

                        var nofunction = "";
                        $('#hdnRemoteFunctionNParam').val(nofunction);
                                              
                    }
                    else {
                      

                        var alreadywonmsg = "You've already won a prize for this line. However, you can wait for the next round and play for a Bingo!";
                        setInformationModePlayer(alreadywonmsg);

                        var nofunction = "";
                        $('#hdnRemoteFunctionNParam').val(nofunction);

                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert('Unexpected error: ' + 'Code: gotLine' + ' Status: ' + textStatus + " .Details: " + errorThrown);
                }
            });

        }

        function gotBingo(mybingo) {
           
            var playerId = $('#hdnNewPlayerId').val();        

            var gameidsess = $('#hdnGameSessionIDplayer').val();

            var mybingo = playerId + ";" + mybingo;
            $.ajax({
            url: "/TTTBingo/BingoCheck",
            xhrFields: {withCredentials: true },
            crossDomain: true,
            data: {
                playerbingocard: mybingo,
                gameidbingo: gameidsess
            },
            type: "POST",
            dataType: "json",
            success: function (result, status, xhr) {

                var resultFromServer = xhr.getResponseHeader("CardPlayerResults");

                

                var underanalysismsg = "Your card is under analysis. Please wait.";
                setInformationModePlayer(underanalysismsg);

                var nofunction = "";
                $('#hdnRemoteFunctionNParam').val(nofunction);
 
            },
            error: function (XMLHttpRequest, textStatus, errorThrown)
                {
                //alert('Unexpected error: ' + 'Code: gotBingo' + ' Status: ' + textStatus + " .Details: " + errorThrown);
            }
            });

        }

        function checkforwinners() {

            var arrgkey = $('#hdnArrGameKey').val();
            //0: GAME NAME
            //1: GAME SESSIONID
            var sessionidgame = arrgkey[1];

            var playerId = "";

            $.ajax({
                url: "/TTTBingo/GetWinner",
                xhrFields: {withCredentials: true },
                crossDomain: true,
                data: {
                    cursessionidgame: sessionidgame
                   },
                type: "GET",
                dataType: "json",
                success: function (result, status, xhr) {

                   var resultFromServer = xhr.getResponseHeader("WinnerResults");

                    //EXAMPLE: LIST OF WINNERS                    
                    //2; LINE1; PlayerM487_1; 2215; Alteryx_False; Sharepoint101_False; Jonatan_False; NA_False; NA_False; NA_False | 
                    //2; LINE2; PlayerI380_1; 2214; NA_False; NA_False; NA_False; PowerBI_False; Douglas_False; Monica_True;|

                    if (resultFromServer != "Nowinners") {
                        var arrpotentialwinners = resultFromServer.split("|");
                        var arrpotentialwinner;
                        var arrplayername;
                        var playernickfromnamearray;
                        
                        var newtr_html = '';

                        //POTENTIAL WINNERS...
                        $('#dvWinnersGrid').show();

                        for (var i = 0; i < arrpotentialwinners.length - 1; i++) {
                            
                            arrpotentialwinner = arrpotentialwinners[i].split(";");
                            arrplayername = arrpotentialwinner[2].split("_");
                            playernickfromnamearray = arrplayername[0];

                            newtr_html += "<tr><td>" + arrpotentialwinner[3] + "</td>\
                                       <td>" + playernickfromnamearray + "</td>\
                                       <td>" + arrpotentialwinner[1] + "</td>\
                                       <td id='tddyn_" + i + "'><a href='#' id='lnkCheck_"+ i + "' onClick='CheckPlayerCard(this);' >Check</a></td></tr>";

                            $('#tbWinnersGrid').html(newtr_html);

                        }

                        arrprizeclaims = arrpotentialwinners;
                        arrpotentialwinners = [];
                    }
                    else
                    {
                        var tmrbeforeblocking = 5;
                        blockincomingplayers(tmrbeforeblocking);
                    }


                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                                //alert('Unexpected error: ' + 'Code: checkforwinners' + ' Status: ' + textStatus + " .Details: " + errorThrown);
                }
            });
        }

        $('#QaskedClose').click(function () {
            $('#mdQuestionsasked').hide();
        });

        $('#QClose').click(function () {
            $('#modQuestions').hide();
        });


//************* BINGO THEMES ***********************

        $('#tdThWomen').click(function () {
           
            var notavailablemsg = "Under construction.";
            setInformationMode(notavailablemsg);

            var nofunction = "";
            $('#hdnRemoteFunctionNParam').val(nofunction);
        });

        $('#tdThDef').click(function () {
          
            $(this).addClass('thSelected');

            $('#tdThCorp').removeClass('thSelected');
           

            var bingotheme = "defaulttheme";
           

            var confirmMsg = "WARNING: This change cannot be undone. This change will affect all the current players. Proceed?";

            var funcname = "setbingotheme";
            ConfirmDialogBingo(bingotheme, funcname, confirmMsg);

            //CANCEL OPS
            var cancelsetcorp = "SetCorpSkin";
            $('#hdnCancelOperations').val(cancelsetcorp);

        });

        $('#tdThCorp').click(function () {
           
            $(this).addClass('thSelected');

            $('#tdThDef').removeClass('thSelected');
          

            var bingotheme = "corporatetheme";

          
    
            var confirmMsg = "WARNING: This change cannot be undone. This change will affect all the current players. Proceed?";
      
            var funcname = "setbingotheme";
            ConfirmDialogBingo(bingotheme, funcname, confirmMsg);

            //CANCEL OPS
            var cancelsetdef = "SetDefSkin";
            $('#hdnCancelOperations').val(cancelsetdef);
        });

        $('#tdThPride').click(function () {
         
            var notavailablemsg = "Under construction.";
            setInformationMode(notavailablemsg);

            var nofunction = "";
            $('#hdnRemoteFunctionNParam').val(nofunction);
        });

        $('#tdThHalloween').click(function () {
            
            var notavailablemsg = "Under construction.";
            setInformationMode(notavailablemsg);

            var nofunction = "";
            $('#hdnRemoteFunctionNParam').val(nofunction);
        });

        $('#tdThXmas').click(function () {
            
            var notavailablemsg = "Under construction.";
            setInformationMode(notavailablemsg);

            var nofunction = "";
            $('#hdnRemoteFunctionNParam').val(nofunction);
        });


        function setbingotheme(skin) {

            var arrgkey = $('#hdnArrGameKey').val();
            //var arrgamekey = newgamename.split("_");
            //0: GAME NAME
            //1: GAME SESSIONID
            var sessionidgame = arrgkey[1];


            var progressmsg = "Applying theme...";
            setWarningMode(progressmsg);

            $.ajax({
                url: "/TTTBingo/SetBingoSkin",
                xhrFields: { withCredentials: true },
                crossDomain: true,
                data: {
                    bingotheme: skin,
                    newgameid: sessionidgame
                },
                type: "POST",
                dataType: "json",
                success: function (result, status, xhr) {

                    var resultFromServer = xhr.getResponseHeader("JSonSetBingoSkinResult");
                   
                    if (resultFromServer != "Error") {

                        var tmrbeforeblocking = 5;
                        blockincomingplayers(tmrbeforeblocking);
                  
                    }



                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert('Unexpected error: ' + 'Code: removeplayer' + ' Status: ' + textStatus + " .Details: " + errorThrown);
                }
            });
        }

        function getskinname(gamsessionkey) {

            var skinid = "";

            $.ajax({
                url: "/TTTBingo/GetSkinNameForPlayers",
                xhrFields: { withCredentials: true },
                crossDomain: true,
                data: {
                    nextskin: skinid,
                    gid: gamsessionkey
                },
                type: "GET",
                dataType: "json",
                success: function (result, status, xhr) {

                    var resultFromServer = xhr.getResponseHeader("ActivationCodeNextSkin");
                    //console.log(' GetSkinNameForPlayers:' + resultFromServer);

                    if (resultFromServer != null && resultFromServer != "" && resultFromServer != "Error" && resultFromServer != "KeepChecking") {

                        var setskindatals = resultFromServer.split(";");

                        //console.log('EVENTYPE / THEME: ' + setskindatals[0] + " / " + setskindatals[1]);

                        if (setskindatals[0] == "9") {
                            if ($('#div1').is(':visible')) {

                                var namedskin = setskindatals[1];

                                clearInterval(timerCheckReqSkinChange);
                                timerCheckReqSkinChange = undefined;

                                setplayerskin(namedskin);
                               
                            }
                        }
                        else {
                            var tmrgetskin = 1;
                            getbingoskinrequest(tmrgetskin);
                        }
                    }
                    else
                    {

                        if (resultFromServer == "KeepChecking") {
                            var tmrgetskin2 = 1;
                            getbingoskinrequest(tmrgetskin2);
                        }
                    }

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert('Unexpected error: ' + 'Code: getactivationcodenextq' + ' Status: ' + textStatus + " .Details: " + errorThrown);
                }
            });

        }


//************* END SECTION BINGO THEMES ***********************


        function Editme() {

            var hdnArrGameKey2 = "";
            var idquestion = $('#hdnQEdition').val();
            var arreditionnewtrivia = idquestion.split("_");
            //  IDQUESTION_ROWID

            console.log("QUESTION DATA ID: " + idquestion);

            $('#tbQuestionsAdmin').hide();
            $('#tbLQControls').hide();
            $('#QClose').removeClass('QClose');
            $('#QClose').addClass('QCloseAddEdit');
            $('#titAllQ').hide();
            $('#titNewQ').hide();            
        
            $('#titEditQ').show();
            $('#btnList').show();
            $('#tbAddEditQuestion').show();
            $('#btnSaveQuestion').show();

            var arrquestionlsofficial = officialquestionsls[arreditionnewtrivia[1]].split(";");
            //FROM #1 , QuestionText ; QuestionStatus  ; Answer  

            var txinRWQuestion = arrquestionlsofficial[1];
            var txinEditStatus = arrquestionlsofficial[2];
            var txinRWAnswer = arrquestionlsofficial[3];

            $('#hdnArrGameKey').val(hdnArrGameKey2);
            $('#hdnQuestionToUpdate').val(arreditionnewtrivia[0]);

            $('#inRWQuestion').val(txinRWQuestion);
            $('#inEditStatus').val(txinEditStatus);
            $('#inRWAnswer').val(txinRWAnswer);

        }

        function BingoStart2(sec3) {

            var timer2 = setInterval(function () {
                var isthereplayer = "initialvalue";
                    $('#div9 span').text(sec3--);
                    if (sec3 == -1) {
                        $('#div9').fadeOut('fast');

                        if ($('#chkAutomaticNick').is(':checked')) {
                            isthereplayer = GenerateAutomaticPlayer();
                        }
                        else {
                            isthereplayer = $('#txtCustomNick').val();
                        }

                        if (isthereplayer != "initialvalue" && isthereplayer != "") {
                            clearInterval(timer2);
                            timer2 = undefined;
                        }
                        else {
                            clearInterval(timer2);
                            timer2 = undefined;
                            $('#div11').show();
                        }

                    }
            }, 1000);
        }

        function updatequestionlist() {

            var arrgkey = $('#hdnArrGameKey').val();
            //0: GAME NAME
            //1: GAME SESSIONID
            var sessionidgame = arrgkey[1];

            $.ajax({
                url: "/TTTBingo/QuestionSaveUpdate",
                xhrFields: { withCredentials: true },
                crossDomain: true,
                data: {               
                    gid: sessionidgame
                },
                type: "POST",
                dataType: "json",
                success: function (result, status, xhr) {

                    var resultFromServer = xhr.getResponseHeader("JSonQuestionResults");
                   

                    var newtr_nomorequestions = '';

                    var arrnoquestionsfromserver = resultFromServer.split(";");


                    //SHOW QUESTION TO THE ADMIN....
                    if (arrnoquestionsfromserver[0] != "Nomorequestions") {
                        $("#h3QuestionText").text(resultFromServer);

                        //GETS LIST OF POTENTIAL WINNERS
                        var secwinner = 60;
                        getwinner(secwinner);
                    }
                    else {
                        $('#div3').hide();
                        $('#dvAdmin').hide();
                        $('#div4').show();

                        //TO DO: REENABLE THIS SECTION WHEN MULTISESSION IS FINISHED.
                        //if (arrnoquestionsfromserver[1] != "NoWinnersTotal") {

                        //    for (var f = 2; f < arrnoquestionsfromserver.length; f++) {
                           
                        //        //TODO SPLIT STRING MAY BE NECESSARY
                        //        var arrwinnernoquestions = arrnoquestionsfromserver[f].split("_");
                        //        var winnersnoquestions = arrwinnernoquestions[0];

                        //        newtr_nomorequestions += "<tr><td>" + winnersnoquestions + "</td></tr>";
                        //        $('#tbNoMoreQuestions').html(newtr_nomorequestions);
                        //    }

                        //}
                        //else {
                        //    newtr_nomorequestions += "<tr><td>" + "No winners for this round." + "</td></tr>";
                        //    $('#tbNoMoreQuestions').html(newtr_nomorequestions);
                        //}
                    }

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert('Unexpected error: ' + 'Code: updatequestionlist' + ' Status: ' + textStatus + " .Details: " + errorThrown);
                }
            });

        }

        function clearallremainingplayers() {
        
            var playerstodelete = "dummy";

            $.ajax({
                url: "/TTTBingo/RemoveAllRemainingActivePlayers",
                xhrFields: { withCredentials: true },
                crossDomain: true,
                data: {
                    playerId: playerstodelete
                },
                type: "POST",
                dataType: "json",
                success: function (result, status, xhr) {

                    var resultFromServer = xhr.getResponseHeader("JSonRemoveAllRemainingPlayerResult");             

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert('Unexpected error: ' + 'Code: clearallremainingplayers' + ' Status: ' + textStatus + " .Details: " + errorThrown);
                }
            });
        }

        function removeplayer() {

            var playertodelete = $('#hdnNewPlayerId').val();

            $.ajax({
                url: "/TTTBingo/PlayerRemoveById",
                xhrFields: { withCredentials: true },
                crossDomain: true,
                data: {
                    playerId: playertodelete
                },
                type: "POST",
                dataType: "json",
                success: function (result, status, xhr) {

                    var resultFromServer = xhr.getResponseHeader("JSonRemovePlayerResult");
                   

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert('Unexpected error: ' + 'Code: removeplayer' + ' Status: ' + textStatus + " .Details: " + errorThrown);
                }
            });
        }

        function updateplayer(newplayer)
        {

            var progressmsg = "Please wait...";
            setWarningMode(progressmsg);

            var playertoinsert = newplayer;

           $.ajax({
                url: "/TTTBingo/PlayerSaveUpdate",
                xhrFields: {withCredentials: true },
                crossDomain: true,
                data: {
                    playerId: 0,
                    playername: playertoinsert
                         },
                type: "POST",
                dataType: "json",
               success: function (result, status, xhr)
               {

                    var resultFromServer = xhr.getResponseHeader("JSonPlayerResultado");
                  
                   //WHEN ADMIN CREATE: 
                   //           ADMIN; 12; ADMIN
                   //WHEN PLAYER CREATE:
                   //27; PlayerO682; Tall; Burn; Long; White; Blue; Short;
                   var arrNewPlayer = resultFromServer.split(";");
                   
                   if (arrNewPlayer[0] != "Error")
                   {

                       if (arrNewPlayer[0] == "ADMIN")
                       {
                           hidepopdiv();
                                //CASE ADMIN: ADMIN;12;ADMIN
                            var adminplayerID = arrNewPlayer[1] + ";" + "ADMIN";
                               
                            $('#hdnNewPlayerId').val(adminplayerID);
                            //**** REGISTER ADDITIONAL INFORMATION BEFORE BEGINNING TO PLAY ****

                            $('#modRegisterWinners').show();

                       }
                       else
                       {
                           hidepopdiv();
                            //***** Show PLAYER options and controls  *****
                            //**** REGISTER ADDITIONAL INFORMATION BEFORE BEGINNING TO PLAY ****
                            //var adddataplayerID = arrNewPlayer[0];

                           var adddataplayerID = arrNewPlayer[1] + ";" + "PLAYER";

                            $('#hdnNewPlayerId').val(adddataplayerID);
                           
                            $('#modPlayerGameKey').show();
                            //$('#modRegisterWinners').show();

                       }
                    }
                },
               error: function (XMLHttpRequest, textStatus, errorThrown)
               {
                   //alert('Unexpected error: ' + 'Code: updateplayer' + ' Status: ' + textStatus + " .Details: " + errorThrown);
                   console.log('Unexpected error: ' + 'Code: updateplayer' + ' Status: ' + textStatus + " .Details: " + errorThrown);
               }
            });

        }


    //**** BEGIN ADMIN FUNCTIONS ********


        function addeditquestion(idq) {  
             
            var questiontext1 = $('#inRWQuestion').val();
            var answer1 = $('#inRWAnswer').val();
            var empty = "";


            if (questiontext1 != null && questiontext1 != "" && answer1 != null && answer1 != "")
            {
                    $.ajax({
                    url: "/TTTBingo/AddEditQuestion",
                    xhrFields: { withCredentials: true },
                    crossDomain: true,
                        data: {
                            questionsid: idq,
                            questiontext: questiontext1,
                            answer: answer1,
                            questionqstatus:empty
                            
                    },
                    type: "POST",            
                    dataType: 'json',
                    success: function (result, status, xhr) {

                        var resultFromServer = xhr.getResponseHeader("JSonAddEditQuestionResult");
                        if (resultFromServer != "Error") {
                            //$('#mnQuestions').click();

                            if ($('#mnQuestions').is(':visible')) {
                                 $('#mnQuestions').click();
                            }
                            else {
                                $('#modQuestions').show();
                                $('#tbQuestionsAdmin').show();
                                $('#tbAddEditQuestion').hide();

                        //message1 = "EditSuccess" + ";" + EditedQuestion.GameSessionId;
                                console.log('AFTER Q EDITION: ' + resultFromServer);
                                var arrbackfromedit = resultFromServer.split(";");

                                if (arrbackfromedit[0] == "EditSuccess") {
                                    getAllQuestions(arrbackfromedit[1]);
                                }
                                else {
                                     getAllQuestions(idq);
                                }
                               
                            }
                        }

                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        //alert('Unexpected error: ' + 'Code: addeditquestion' + ' Status: ' + textStatus + " .Details: " + errorThrown);

                    }
                });
            }
            else
            {              

                var blanknotallowedmsg2 = "Empty fields are not allowed. Status can only be 1 or 0.";
                setInformationMode(blanknotallowedmsg2);

                var nofunction = "";
                $('#hdnRemoteFunctionNParam').val(nofunction);
            }


        }

        //**** END ADMIN FUNCTIONS ********

        function GenerateAutomaticPlayer() {
            //Get random number
            var foo = new Array(800);
            for (var i = 0; i < foo.length; i++) {
                foo[i] = i;
            }
            var randomint = foo[Math.floor(Math.random() * foo.length)];
            //*************************************************

            //Get random char
            var mychars = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
                'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');

            var randomchar = mychars[Math.floor(Math.random() * mychars.length)];
            //*************************************************

            //Return player: "Player" + randomchar + randomint;
            var automaticplayer = "Player" + randomchar + randomint;
            return automaticplayer;
}
        //********************************


        function AwesomeCountDown() {

            $('.count').each(function () {
                
                $(this).prop('Counter', 0).animate
                    (
                        {
                            Counter: $(this).text()
                        },
                        {
                            duration: 4000,
                            easing: 'swing',
                            step: function (now) {
                                $(this).text(Math.ceil(now));
                            }
                        }
                    );
            });


            $('.winnerprogress_Default').each(function () {
                $(this).animate
                    (
                        {
                            width: '100%'
                        },
                        4000
                    );
            });

        }