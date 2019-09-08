

let voiceStyle = $('input[type=radio]:checked').val();
let music = new MusicBox('.leftHand','.rightHand',{
    type: voiceStyle,
    duration: 2,
    autoplay:10,
});

console.log(music);


//play music
$('.Lemon').click(function () {
 let musicName = $(this).text();

//get json data
    $.getJSON('./musicContext.json',(data)=>{
        music.playMusic(data[musicName].melody);      //加载旋律
       // music.pauseMusic(false);   //start
        $('#speedControl').val(data[musicName].speed); //改speed进度条
        $('#speedValue').text(data[musicName].speed);  //改speed文本
        music.setPlaySpeed(data[musicName].speed);    //更改music speed
    });

});


//change style
$('input[type=radio]').click(function () {
    voiceStyle = $('input[type=radio]:checked').val();
    music.opts.type = voiceStyle;
});

//pause music
$('.stopBtn').click(()=>{
   music.pauseMusic(true);
});