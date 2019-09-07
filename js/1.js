

let voiceStyle = $('input[type=radio]:checked').val();
let music = new MusicBox('.leftHand','.rightHand',{
    type: voiceStyle,
    duration: 3,
    autoplay:10,
    speed:170

});






console.log(music);

$('.btn').click(function () {

  //  music.playMusic(`e=6=6=7=7=C=C=7=7=6=6=3=3=1=1=a=a=5=5=4=4=3=4=5=4 0 0=4=4=5=5=6=6=7=7=5=5=2=2-4-4=3=3=2=3=4=3=0 E 3-a=1=3=2=3-a=1=3=2=3-a=1=4=3=4-a=1=4=3=4-4=3=4=4=5-5=6=5=6=3=|E-6=C=E=D=E-6=C=E=D=E-6=C=F=E=F-6=C=F=E=F-F=E=F=F=G-G=A=G=A=E= 0 0`);

//get json data
    $.getJSON('./musicContext.json',(data)=>{
        console.log(data[0].melody);
        music.playMusic(data[0].melody);
    });

})

$('input[type=radio]').click(function () {
    //alert($(this).val());

    voiceStyle = $('input[type=radio]:checked').val();
    music.opts.type = voiceStyle;
})