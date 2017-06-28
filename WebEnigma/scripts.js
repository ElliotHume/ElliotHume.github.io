var active = false;
var sequence = 0;
var puzzle = null;
var skips = 0;
var turing_bonus = false;
var sequence_length = 30;
var command_list = [];
var command_index = 0;

$(document).ready(function(){
	var $Q = $('.question-box');
	var $C = $('.command-box');
	var $P = $('.previous-commands')
	var $c = $('#input-box');
	puzzle = new Puzzle(0)

	$(document).bind("contextmenu",function(e) {
		e.preventDefault();
	});

    $(document).keydown(function(key){
        vale = $c.val().toLowerCase();
		if (key.which == 13){
			if (vale.length > 0 || puzzle.keys[0]==""){
				$P.prepend('<p>> '+vale+': '+ action(vale)+'</p>');
				command_list.push(vale);
				command_index = 0;
				$c.val("");
			}
		} else if (key.which === 123){
       		return false;
    	} else if (key.which == 38){
			$c.val(command_list[(command_list.length - 1 - command_index)]);
			if (command_index < command_list.length-1){
				command_index++;
			}
		} else if (key.which == 40){
			$c.val(command_list[(command_list.length - 1 - command_index)]);
			if (command_index >= 0){
				command_index--;
			}
		}
    });
});

function action(keyword){
	keyword = keyword.trim();

	switch(keyword){
		case "rules":
			ruleClick();
			return "The rules are as follows:";
		case "clear":
			clearPrevious();
			return "Cleared previous commands.";
		case "alan turing":
			if (!turing_bonus){
				skips--;
				turing_bonus = true;
				return "Welcome sir, +1 skip unlocked";
			} else {
				return "You have already logged in sir, no further identification is required.";
			}
		case "restart":
			history.go(0)
			return "RESTARTING..."
		case "skips":
			return "You have "+(8 - skips)+" skips remaining."
	}

	if (!active){
        if (keyword == "start"){
    		active = true;
			$("h1").css("width", "0");
			$('.skip-button').css("display","inline");
			$('.button').css("display","inline");
			$('#command').css('color', 'rgb(5,200,5)');
			$('#title-bar').css('cursor', '');
			$('#title-bar').attr("onclick", "#");
			$("#google-icon").css("display", "inline");
			puzzle.display()
    		return "let the games begin, you may skip up to 8 puzzles with the keyword 'skip' or the button.";
        } else if (keyword == "enigma"){
            return "What do you need to do to finish a race?";
        }
    } else {
		if (puzzle.keys.indexOf(encrypt(keyword)) != -1){
			if (sequence < sequence_length){
				sequence++;
				puzzle = new Puzzle(sequence);
				puzzle.display()
				return "Correct"
			}
			$("#google-icon").hide();
			$("#puzzle_name").css("text-align", "center");
			$("#puzzle_name").css("width", "100%");
			$("#puzzle_text").html("");
			$("#puzzle_image").attr("src", "");
			if (skips == 0 || skips == -1){
				$("#puzzle_name").css("color","rgb(5,200,5)");
				$('h1').css('color', 'grey');
				$("#puzzle_name").html("You have solved the enigma");
				return "You have solved the enigma";
			} else if (skips < -1){
				$("#puzzle_name").css("color","darkred");
				$("#title-bar").css("outline-color","darkred");
				$('h1').css('color', 'grey');
				$('h1').css('text-shadow', '2px 2px darkgrey');
				$('#title-bar').css('border-image', 'linear-gradient(to bottom, darkred, black) 1 100%');
				$("#puzzle_name").html("You have been identified as a cheater. Your IP address has been recorded.");
				return "You have been identified as a cheater. Your IP address has been recorded.";
			} else {
				$("#puzzle_name").css("color","darkred");
				$("#title-bar").css("outline-color","darkred");
				$('h1').css('color', 'grey');
				$('h1').css('text-shadow', '2px 2px darkgrey');
				$('#title-bar').css('border-image', 'linear-gradient(to bottom, darkred, black) 1 100%');
				$("#puzzle_name").html("You failed to solve the enigma. Try again without skipping any questions");
				return "You failed to solve the enigma. Try again without skipping any questions";
			}
			
		} else if (keyword == "skip"){
			if (sequence < sequence_length){
				return skipPuzzle(false);
			} else {
				return "You may not skip this question.";
			}
		} else {
			return "Incorrect";
		}
	}
}

class Puzzle {
	constructor(sequence){
		this.sequence = sequence;
		this.name = "";
		this.text = [];
		this.pic = null;
		this.google = false;
		this.keys = [];
		this.build();
	}

	build(){
		function decrypt(message){
			var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
			var U_alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
			var keys = "qazwsxedcrfvtgbyhnujmikolp".split("");
			var U_keys = "qazwsxedcrfvtgbyhnujmikolp".toUpperCase().split("");


			var keydict = {};
			for(var i=0; i < alphabet.length; i++){
				keydict[keys[i]] = alphabet[i];
			}

			var U_keydict = {};
			for(var i=0; i < U_alphabet.length; i++){
				U_keydict[U_keys[i]] = U_alphabet[i];
			}

			var loc = message.split("");
			for (var i=0; i < loc.length; i++){
				if($.inArray(loc[i], alphabet) != -1 ){
					if(loc[i] == loc[i].toLowerCase()){
						loc[i] = keydict[loc[i]];
					} else {
						loc[i] = U_keydict[loc[i]];
					}
				}
			}
			return loc.join("");
		}
		this._data = decrypt("    Fcnuj Qmsujcbg~Wdb qt I?~ymppvsu/ctqesu/shmqjcbg.ryse~jnms~ksqjephhs*    Rcwwvs~Au q ujbgs cgucws q jnss, I'vv dsvy lbmn kbnwu bmjvcis jdss._Bmj cx lbm ymud ts qu I ujqgw, jds tbns I tbis jds vsuu I qt._ _Wdqj qt I?~gmvv~~p guehsn_guehsn*    Ayjcjmws jsuj~ Wdqj cu jds gsoj gmtasn cg jdcu ushmsgzs?_0 1 3 3 8 21 ?~gmvv~jnms~165*    Rcwwvs~Wdqj cu asjjsn jdqg ebw, kbnus jdqg jds wsicv,_wsqw ysbyvs sqj cj, amj cx lbm sqj cj lbm wcs?~gmvv~~ejrwsez*     ~bwebibn rs rswgbujqiqg~gmvv~jnms~tsagnu*    Psnubgqv Dnsqt Rcwwvs (Equl)~_A yqvs udqwbk bg wqnf kqjsn,_Ybm'vv uss ts kdsg ucedj cu vbuj,_A dqvx bx ts cu qvv lbm'vv uss qgw sisg jdqj tql wcxxsn._ _Wdqj qt I?~gmvv~~rwu ajje_ajje*    Psnubgqv Rcwwvs (Vsnl Dcxxczmvj)~_I qt ecisg cg jctsu kdsg q emcwcge dqgw cu gsswsw,_Ybm kcvv gbj gssw ts cx lbm dqis ts,_amj kdsg lbm gssw ts, kcjd q ujnqgesn I kcvv as._ _Wdqj qt I?~~gmvv~osluhrsjet_p osluhrsje_osluhrsje*    Shmqnsu~Hbk tqgl uhmqnsu qns jdsns cg jdcu yczjmns?~ymppvsu/ctqesu/uhmqnsu.ryse~~40_41*    Psnubgqv Rcwwvs (Dcxxczmvj)~I qt jds ensqj bgs-slsw asquj jdqj wsujnblu qvv cg tl yqjd,_A wstbg kcjd gb xbnt amj q abwl bx knqjd,_I qt abng al jds svstsgju qgw zbts xnbt jds usq,_Tdnbmed gqjmns I tqfs zdqbu jdqj uynsqwu qznbuu vsqemsu._Wdqj qt I?~gmvv~jnms~wmllshpeu_p wmllshpeu_hbhnjeu_p hbhnjeu_rbgwjje_p rbgwjje_wmllshpeut_hbhnjeut_rbgwjjet*    Wbnwu~Hbk tqgl tsqgcgeu wbsu jds kbnw \"Ogs\" dqis?~gmvv~xqvus~3*    Wbnwu~Hbk tqgl tsqgcgeu wbsu jds kbnw \"Tdnss\" dqis?~gmvv~jnms~jeu*    Rcwwvs~Kssy ts jb lbmnusvx qgw I kcvv as dsvw, udqns ts kcjd xsk qgw I zqg as fsyj, ecis ts jb tqgl qgw I kcvv as anbfsg_Wdqj qt I?~gmvv~~p tuhlur_tuhlurt_tuhlur*    Bnqcg jsqusn~Wdczd gmtasnu qns bg jds fslabqnw?~~gmvv~pnn jk rwua_pnn_seksesru_seksesrb_ufulb jeu_ufulb emaqul_pnn emaqult_pnn jk rwu emaqult*    Tnczf~Wdqj wbsu bgs wb kdsg jdsl qns zbtcge cgjb q nbbt, bn zbtcge aqzf jb q nbbt~gmvv~~*    Rcwwvs~Wdqj enbku kdsg cj sqju, amj wcsu kdsg cj wncgfu?~gmvv~~p kslu_kslu_p knpau_knpaut_ruuepzult*    Rcwwvs~I dqis q dsqw, q jqcv, qgw gbjdcge tbns._Wdqj qt I?~gmvv~~p hjse_hjse_hjset*    Wdqj qt I?~051409071301~gmvv~~ueszap*    Psnubgqv Rcwwvs (Dcxxczmvj)~Sbts uql lbm'vv uss cj ubbg, bjdsnu uql cj kcvv gsisn zbts._Avv kcvv uysqf bx cj, kcjd dbysu bn cg xsqn._Ij kcvv fcvv sisnl ascge qgw ancge sisnl zdcvw jb vcxs._Ij kcvv qvkqlu socuj qgw gsisn as jbmzdsw, xbn cj'u gqjmns cu tlujsnl qgw cj'u ybksn cu tmzd._Wdqj cu cj?~gmvv~jnms~rjajlljc_rwu euvr opb_rwu kmrmlu_kmrmlu*    Gsbtsjnl~Wdczd jncqgevs kcjd jds ecisg ucws vsgejdu dqu q utqvvsn umnxqzs?_A: 300, 400, 700_B: 100, 200, 300~gmvv~jnms~eusrwul_qjrw_p peo q_ejeu_pq*    Bnqcg jsqusn~Sbts tbgjdu dqis 30 wqlu, ubts dqis 31 wqlu._Hbk tqgl tbgjdu dqis 28 wqlu?~gmvv~~12_pnn_pnn jk rwua_ufulb jeu_ufulb ajerw_pnn ajerwt_pnn jk rwu ajerwt*    Rcwwvs~Mqgl dqis dsqnw ts,_amj gbabwl dqu ussg ts,_qgw I kcvv gbj uysqf aqzf mgjcv uybfsg jb._Wdqj qt I?~gmvv~~pe uhwj_uhwj_uhwjut*    Sjbnl~THE Tncas vsqwsn Iegcjsw dcu sgstl'u zvbjdsu qu dcu Tncas Lcujsgsw jb jds ubmgw_bx jdscn yncubgEn'u yvsqwcge, kcjdbmj tsnzl, kcjdbmj nstbnus._Ig jdcu jqvs kcvv lbm xcgw jds qguksn.~gmvv~~trjlb*    Tnczfl Hcujbnl~Wdqj cu jds 6jd gqts ecisg jb jds Lqwl bx jds Lqfs?~gmvv~jnms~esfspe*    Psnubgqv Rcwwvs (Mswcmt)~I dqis slsu amj wb gbj uss,_A tbmjd amj zqg gbj uysqf,_Hqgwu jdqj kcvv gbj dbvw,_Lseu jdqj kcvv gbj nmg,_Agw q dsqnj jdqj zqg gbj xssv._Wdqj qt I?~gmvv~xqvus~p hjlgtu_hjlgtu_p oupo ape_p oupo gultje_rwu oupo_p oupo qjob_oupo qjob*    Dssy jdbmedju~101010_kdqj qt I?~gmvv~jnms~42_rwu petcul rj nsku, rwu mesfultu, peo ufulbrwsez_rwu petcul rj rwu mnrsapru dmutrsje jk nsku, rwu mesfultu, peo ufulbrwsez*    Rcwwvs~A gqjmnqv ujqjs, I't ubmedj al qvv._Gb kcjdbmj ts, qgw lbm udqvv xqvv._Ybm wb ts kdsg lbm uysgw,_qgw mus ts kdsg lbm sqj jb gb sgw._Wdqj qt I?~gmvv~~qpnpehu*    Vcanqjcge ybvsqnt~Wdqj cu ds jdqj amcvwu ujnbgesn jdqg scjdsn jds tqubg, jds udcykncedj, bn jds zqnysgjsn?~gmvv~jnms~rwu zlpfuoszzul_p zlpfuoszzul_zlpfuoszzul_p zlpfu oszzul_rwu zlpfu oszzul_zlpfu oszzul*    Rcwwvs~Wdb tqfsu cj wbsu gbj kqgj cj,_kdb amlu cj wbsu gbj gssw cj,_qgw kdb gsswu cj wbsu gbj fgbk cj._Wdqj cu cj?~gmvv~~p hjkkse_hjkkse_hjkkset*    Psnubgqv Rcwwvs (Vsnl Equl)~I dqis tqgl xqzsu qgw tqgl xcemnsu,_ub lbm kcvv gsisn emsuu kdqj tl zbvvszjcbg mgzbisnu._Wdcvs nsemvqn I tql as, I zqg nba lbm kcjd evss_xbn tl jnms ujnsgejd vcsu cg jds eqtavs_Wdqj qt c?~gmvv~~hplot_p hplo_hplo_p ouhx jk hplot_ouhx jk hplot*    Fcgqv hmsujcbg~Tdcu jdcge qvv jdcgeu wsibmnu:_Bcnwu, asquju, jnssu, xvbksnu;_Ggqku cnbg, acjsu ujssv;_Gncgwu dqnw ujbgsu jb tsqv;_Svqlu fcge, nmcgu jbkg,_Agw asqju dced tbmgjqcg wbkg._ _Wdqj qu cj?~gmvv~~rsau");
		this.lines = this._data.split("*");
		sequence_length = this.lines.length - 1;
		this.contentsList = this.lines[this.sequence].split("~");
		this.name = this.contentsList[0];
		this.text = this.contentsList[1].split("_");
		this.pic = (this.contentsList[2] != "null") ? this.contentsList[2] : null;
		this.google = (this.contentsList[3] == "true") ? true:false ;
		this.keys = this.contentsList[4].split("_");
		this._data = null;
		this.lines = null;
		this.contentsList = null;
	}

	display(){
		$("#puzzle_name").html(this.name);
		$("#puzzle_text").html("");
		for (var i = 0; i < this.text.length; i++){
			$("#puzzle_text").append("<p>"+this.text[i]+"</p>");
		} 
		$("#puzzle_image").attr("src", this.pic);
		if (this.google) {
			$("#google-icon").attr("src", "puzzles/images/googlecheck.png");
		} else {
			$("#google-icon").attr("src", "puzzles/images/googlex.png");
		}
	}
}

function skipPuzzle(bol) {
	if (skips < 8) {
		if(bol){
			if (sequence < sequence_length){
				skips++;
				sequence++;
				$('.previous-commands').prepend('<p>> skip: Skipped </p>');
				puzzle = new Puzzle(sequence);
				puzzle.display();
			} else {
				$('.previous-commands').prepend('<p>> skip: You may not skip this question. </p>');
			}
		} else {
			skips++;
			sequence++;
			puzzle = new Puzzle(sequence);
			puzzle.display();
			return "Skipped";
		}
	} else if (bol) {
		$('.previous-commands').prepend('<p>> skip: You have used up all available skips. </p>');
	} else {
		return "You have used up all available skips";
	}
}

function titleClick(){
	$("#input-box").val("Enigma");
}

function ruleClick(){
	$('.previous-commands').prepend('<p>> 7: All victors may submit a puzzle to be added to the Enigma. If you do solve the Enigma, send me an email with a screen shot of the victory screen and your puzzle that you wish to add, I will check the log files to make sure your victory is legitimate and then will add your puzzle to the game so long as I find it to be well fit for the Enigma. Your submitted puzzle must include the puzzle\'s title, the puzzle question, all acceptable answers, an image(if it is a visual puzzle), and a true/false for if the player can use google. Please keep the puzzle answers to a maximum of 3-4 words (no sentences or complex theories). Email: xelerayte@gmail.com </p>');
	$('.previous-commands').prepend('<p>> 6: Have fun! Please do not take the game too seriously, it is designed to be a fun challenge for those who enjoy puzzles and brain teasers. </p>');
	$('.previous-commands').prepend('<p>> 5: At any time you may restart by pressing the restart button in the top right corner, there is no limit to the amount of attempts you have. </p>');
	$('.previous-commands').prepend('<p>> 4: Do not cheat. This game uses an honor system. I am aware that there are ways to cheat and I ask that you would please not use them. I use log files and will be able to see if/when your victory is legitimate. </p>');
	$('.previous-commands').prepend('<p>> 3: You may use google for questions that have a green check mark in the top left corner, you may not if there is a red x. </p>');
	$('.previous-commands').prepend('<p>> 2: You may skip up to 8 questions by using the keyword "skip" or by pressing the skip button in the top right corner </p>');
	$('.previous-commands').prepend('<p>> 1: Answer the puzzles by typing in the command box and pressing enter to submit. </p>');
}

function clearPrevious(){
	$('.previous-commands').html('');
}

function encrypt(message){
	alph = "abcdefghijklmnopqrstuvwxyz"
	k_alph = "zaqxswcdevfrbgtnhymjukilop"
	alphabet = alph.split("");
	U_alphabet = alph.toUpperCase().split("");
    keys = k_alph.split("");
	U_keys = k_alph.toUpperCase().split("");


    keydict = {};
    for(var i=0; i < alphabet.length; i++){
		keydict[alphabet[i]] = keys[i];
	}

    U_keydict = {};
    for(var i=0; i < U_alphabet.length; i++){
		U_keydict[U_alphabet[i]] = U_keys[i];
	}

    loc = message.split("");
    for (var i=0; i < loc.length; i++){
		if($.inArray(loc[i], alphabet) != -1 ){
			if(loc[i] == loc[i].toLowerCase()){
				loc[i] = keydict[loc[i]];
			} else {
				loc[i] = U_keydict[loc[i]];
			}
		}
	}
    return loc.join("");
}