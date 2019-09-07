
/** require jquery **/
let speedControl = () => {
    let speed = $('#speedControl').val();
    // console.log('今のスピードは'+speed+'BPM');
    $('#speedValue').text(speed);
};
$('#speedControl').on('input',speedControl);

//このinputはイベント処理のtypes









