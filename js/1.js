

let voiceStyle = $('input[type=radio]:checked').val();
let music = new MusicBox('.leftHand','.rightHand',{
    type: voiceStyle,
    duration: 2,
    autoplay:10,

});









//play music
$('.Lemon').click(function () {
 let musicName = $(this).text();
 //get json data
    $.getJSON('./musicContext.json',(data)=>{
        music.playMusic(data[musicName].melody,data[musicName].melodyL);      //加载旋律
        if(!music.exist){  //其他音乐不存在的时候 在改变为当前音乐的速度
            $('#speedControl').val(data[musicName].speed); //改speed进度条
            $('#speedValue').text(data[musicName].speed);  //改speed文本
            music.setPlaySpeed(data[musicName].speed);    //更改music speed
        }
    });

});
$('.dreamWedding').click(function () {
    let musicName = $(this).text();

//get json data
    $.getJSON('./musicContext.json',(data)=>{
        music.playMusic(data[musicName].melody,data[musicName].melodyL);      //加载旋律
        // music.pauseMusic(false);   //start
        if(!music.exist){  //其他音乐不存在的时候 在改变为当前音乐的速度
            $('#speedControl').val(data[musicName].speed); //改speed进度条
            $('#speedValue').text(data[musicName].speed);  //改speed文本
            music.setPlaySpeed(data[musicName].speed);    //更改music speed
        }

    });

});
$('.sakura').click(function () {
    let musicName = 'sakura';

//get json data
    $.getJSON('./musicContext.json',(data)=>{
        music.playMusic(data[musicName].melody,data[musicName].melodyNoL);      //加载旋律
        if(!music.exist){  //其他音乐不存在的时候 在改变为当前音乐的速度
            $('#speedControl').val(data[musicName].speed); //改speed进度条
            $('#speedValue').text(data[musicName].speed);  //改speed文本
            music.setPlaySpeed(data[musicName].speed);    //更改music speed
        }
    });

});
$('.test').click(function () {
    console.log(music);
    let musicName = 'sakura';
//get json data
    $.getJSON('./musicContext.json',(data)=>{
        music.playMusic(data[musicName].melody,data[musicName].melodyL);      //加载旋律
        if(!music.exist){  //其他音乐不存在的时候 在改变为当前音乐的速度
            $('#speedControl').val(data[musicName].speed); //改speed进度条
            $('#speedValue').text(data[musicName].speed);  //改speed文本
            music.setPlaySpeed(data[musicName].speed);    //更改music speed
        }
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


