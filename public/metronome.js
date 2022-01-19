var metronome = function(opts) {
    const click1 = new Audio('/sound/click1.mp3');
    const click2 = new Audio('/sound/click2.mp3');
    const metronomeDiv = document.getElementById("metronome");
const popUpMetronomeBtn = document.getElementById("metronomeToggle");
const tempoDisplay = document.querySelector('.tempo');
const tempoText = document.querySelector('.tempo-text');
const decreaseTempoBtn = document.querySelector('.decrease-tempo');
const increaseTempoBtn = document.querySelector('.increase-tempo');
const tempoSlider = document.querySelector('.slider');
const startStopBtn = document.querySelector('.start-stop');
const subtractBeats = document.querySelector('.subtract-beats');
const addBeats = document.querySelector('.add-beats');
const measureCount = document.querySelector('.measure-count');
    //primary variables
    var l = typeof opts.len !== "undefined" ? opts.len : 200, // length of metronome arm
        r = typeof opts.angle !== "undefined" ? opts.angle : 20, //max angle from upright 
    	w = 2 * l * Math.cos(r),
      //  tick_func = typeof opts.tick !== "undefined" ? opts.tick : function() {}, //function to call with each tick
        end_func = typeof opts.complete !== "undefined" ? opts.complete : function() {}, //function to call on completion
        playSound = typeof opts.sound !== "undefined" ? opts.sound : true; 
        let bpm = 150;
        let beatsPerMeasure = 4;
        let count = 0;
       // let isRunning = false;
        let tempoTextString = 'Medium';
    popUpMetronomeAnimationBtn = document.getElementById("metronomeAnimationToggle");
    metronomeDrawing = document.getElementsByTagName('svg');

    popUpMetronomeBtn.onclick = function (){


        // if(metronomeDiv.style.display !=="none")
        // {
        //     metronomeDiv.style.display="none";
        //     container.style.display="none"; 
        // }
        // else
        // {
        //     metronomeDiv.style.display="block";
        //     container.style.display="block";
        // }
    
        if(metronomeDiv.style.visibility=='visible')
        {
            metronomeDiv.style.visibility='hidden';
        }
        else{metronomeDiv.style.visibility='visible';}
    }
    popUpMetronomeAnimationBtn.onclick = function (){

        if(metronomeAnimation.style.visibility=='visible')
        {
            metronomeAnimation.style.visibility='hidden';
            metronomeDrawing.visibility ='hidden';
            $('svg').css({"opacity": 0 });
        }
        else{metronomeAnimation.style.visibility='visible';
        metronomeDrawing.visibility ='hidden';
        $('svg').css({"opacity": 10 });
    }
    }
    decreaseTempoBtn.addEventListener('click', () => {
        if (bpm <= 20) { return };
        bpm--;
        validateTempo();
        updateMetronome();
    });
    increaseTempoBtn.addEventListener('click', () => {
        if (bpm >= 280) { return };
        bpm++;
        validateTempo();
        updateMetronome();
    });
    tempoSlider.addEventListener('input', () => {
        bpm = tempoSlider.value;
        validateTempo();
        updateMetronome();
    });
    
    subtractBeats.addEventListener('click', () => {
        if (beatsPerMeasure <= 2) { return };
        beatsPerMeasure--;
        measureCount.textContent = beatsPerMeasure;
        count = 0;
    });
    addBeats.addEventListener('click', () => {
        if (beatsPerMeasure >= 12) { return };
        beatsPerMeasure++;
        measureCount.textContent = beatsPerMeasure;
        count = 0;
    });
    
    
    function updateMetronome() {
        tempoDisplay.textContent = bpm;
        tempoSlider.value = bpm;
        metronome.timeInterval = 60000 / bpm;
        if (bpm <= 40) { tempoTextString = "Super Slow" };
        if (bpm > 40 && bpm < 80) { tempoTextString = "Slow" };
        if (bpm > 80 && bpm < 120) { tempoTextString = "Getting there" };
        if (bpm > 120 && bpm < 180) { tempoTextString = "Nice and Steady" };
        if (bpm > 180 && bpm < 220) { tempoTextString = "Fast" };
        if (bpm > 220 && bpm < 240) { tempoTextString = "Very fast!" };
    
    
        tempoText.textContent = tempoTextString;
    }
    function validateTempo() {
        if (bpm <= 20) { return };
        if (bpm >= 280) { return };
    }
	// initialize Raphael paper if need be        
    switch(typeof opts.paper) {
		case "string": paper = Raphael(opts.paper, w, l + 20); break;
		default: paper = Raphael(0, 0, w, l + 20); break;
    }

	// initialize audio if need be
    if (playSound && opts.audio) {
		// initialize audio
		var sound = document.createElement('audio');
		sound.setAttribute('src', opts.audio);
		sound.setAttribute('id', 'tick');
		document.body.appendChild(sound);
    }
    
    // derivative variables
    var y0 = l * Math.cos(Math.PI * r / 180),
        x0 = l * Math.sin(Math.PI * r / 180),    
        y = l + 10,
        x = x0 + 10,    
        tick_count = 0;
    
    var outline = paper.path("M"+x+","+y+"l-"+x0+",-"+y0+"a"+l+","+l+" "+2*r+" 0,1 "+2*x0+",0L"+x+","+y).attr({
        fill: "#EEF",
        'stroke-width': 0    
    });
    
    var arm = paper.path("M" + x + "," + (y + 5) + "v-" + (l - 5)).attr({
        'stroke-width': 5,
        stroke: "#999"
    }).data("id", "arm");
        
    var weight = paper.path("M" + x + "," + (y-100) + "h12l-3,18h-18l-3-18h12").attr({
        'stroke-width': 0,
        fill: '#666'
    }).data("id", "weight");

    var vertex = paper.circle(x, y, 7).attr({
        'stroke-width': 0,
        fill: '#CCC'
    }).data("id", "vertex");

    var mn = paper.set(arm, weight);
    
    Raphael.easing_formulas.sinoid = function(n) { return Math.sin(Math.PI * n / 2) };

    function tick(obj, repeats) {      
        //Raphael summons the callback on each of the three objects in the set, so we
        //have to only call the sound once per iteration by associating it with one of the objects.
        //doesn't matter which one
        if (obj.data("id") === "arm") {
            tick_count += 1;
            if (playSound) {    
                if (count === beatsPerMeasure) {
                    count = 0;
                }
                if (count === 0) {
                    click1.play();
                    click1.currentTime = 0;
                } else {
                    click2.play();
                    click2.currentTime = 0;
                }
                count++;
            }
            tick_func(tick_count);            
            if (tick_count >= repeats) {
                mn.attr("transform", "R0 " + x + "," + y);    
                end_func();
            }    
        }
    }    

    return {
        start: function(tempo, repeats) {
            tick_count = 0;
            mn.attr("transform", "R-20 " + x + "," + y);                
            
            //2 iterations per animation * 60000 ms per minute / tempo
            var interval = 120000 / tempo;

			var animationDone = function() { 
				tick(this, repeats); 
			};
			
            var ticktockAnimationParam = {
                "50%": { transform:"R20 " + x + "," + y, easing: "sinoid", callback: animationDone },
                "100%": { transform:"R-20 " + x + "," + y, easing: "sinoid", callback: animationDone }
            };
            
            //animation            
			var ticktock = Raphael.animation(ticktockAnimationParam, interval).repeat(repeats / 2);
			arm.animate(ticktock);
			weight.animateWith(arm, ticktockAnimationParam, ticktock); 
        },
        stop: function() {
            mn.stop();
            mn.attr("transform", "R0 " + x + "," + y);                
            end_func();
        },
        shapes: function() {
        	return {
        		outline: outline,
        		arm: arm,
        		weight: weight,
        		vertex: vertex        	
        	}
        },
        make_input: function(el) {
        	$("<div />", {
        	}).appendTo(el);
        	
		$('.start-stop').click(function() {
			// start animation
			if ($(this).html() === "start") {
				$(this).html("stop");            
				
				//get values for tempo and ticks and restrict
				var tempo = bpm;
				if (!tempo) { tempo = 60; }
				else if (tempo > 300) { tempo = 280; }
				else if (tempo < 20) { tempo = 20; }
                
				//$("#tempo").val(tempo);
				
				var ticks = 400000;
				if (!ticks) { ticks = 80000; }
                else{ticks = 40000}
				// else if (ticks > 60) { ticks = 60; }
				// else if (ticks < 8) { ticks = 8; }
				// $("#ticks").val(ticks); 
                bpm = tempoSlider.value;
                validateTempo();
                 updateMetronome();
				
				m.start(tempo, ticks);
			} else {
				$(this).html("start");
				m.stop();
			}
		});        	
        }
    };
};
// function responsiveBeats()
// {   
//     tempo = bpm;
//     m.start(tempo,ticks);
// }
// setInterval(responsiveBeats(),100);


