
/** require jquery **/
let speedControl = () => {
    let speed = $('#speedControl').val();

    $('#speedValue').text(speed);
    music.setPlaySpeed(speed);
    console.log('現在スピード'+speed+'BPM');
};
$('#speedControl').on('input',speedControl);

//このinputはイベント処理のtypes









