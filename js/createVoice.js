class MusicBox {
    constructor(selectorL,selectorR,options){
        // 默认值

        let defaults = {
            type: 'sine',  // 音色类型  sine|square|triangle|sawtooth
            duration: 2  // 键音延长时间
        };
        // this.opts = Object.assign(defaults, options);
        this.opts = options;

        // 创建新的音频上下文接口
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.arrFrequency = [


            // 131,147,165,175,196,220,247,
            262,294,330,349,392,440,494,
            523,587,659,698,784,880,988,
            1047,1175,1319,1397,1568,1760, 1967,
            2089,2288,2565,2716,3047,3417,3832
                   ];
        this.arrMarks = [
            '#1', '#2', '#3', '#4', '#5', '#6', '#7',
            '1$','2$','3$','4$','5$','6$','7$',
            '1%','2%','3%','4%','5%','6%','7%',
            '1^','2^','3^','4^','5^','6^','7^',];
        this.arrNotes = ['c', 'd', 'e', 'f', 'g', 'a', 'b',
                         '1', '2', '3', '4', '5', '6', '7',
                        'C', 'D', 'E', 'F', 'G', 'A', 'B',
                         '一','二','三','四','五','六','七'];
        this.draw();

        this.speed = 90;
        this.paused = false;

        // 播放乐谱
        // if(this.opts.autoplay){
        //     this.speed = this.opts.autoplay === true ? this.speed : this.opts.autoplay;
        //     this.playMusic(this.opts.musicText);
        // }



    }

    createSound(freq) {
        // 创建一个OscillatorNode, 它表示一个周期性波形（振荡），基本上来说创造了一个音调
        let oscillator = this.audioCtx.createOscillator();
        // 创建一个GainNode,它可以控制音频的总音量
        let gainNode = this.audioCtx.createGain();
        // 把音量，音调和终节点进行关联
        oscillator.connect(gainNode);
        // this.audioCtx.destination返回AudioDestinationNode对象，表示当前audio context中所有节点的最终节点，一般表示音频渲染设备
        gainNode.connect(this.audioCtx.destination);
        // 指定音调的类型  sine|square|triangle|sawtooth
        oscillator.type = this.opts.type;
        // 设置当前播放声音的频率，也就是最终播放声音的调调
        oscillator.frequency.value = freq;
        // 当前时间设置音量为0
        gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
        // 0.01秒后音量为1
        gainNode.gain.linearRampToValueAtTime(1, this.audioCtx.currentTime + 0.01);
        // 音调从当前时间开始播放
        oscillator.start(this.audioCtx.currentTime);
        // this.opts.duration秒内声音慢慢降低，是个不错的停止声音的方法
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + this.opts.duration);
        // this.opts.duration秒后完全停止声音
        oscillator.stop(this.audioCtx.currentTime + this.opts.duration);
    }

     draw(){
         let keyText = [
             '#1', '#2', '#3', '#4', '#5', '#6', '#7',
             '1$','2$','3$','4$','5$','6$','7$',
             '1%','2%','3%','4%','5%','6%','7%',
             '1^','2^','3^','4^','5^','6^','7^',];
         let keyNum = 28;
         let keyL = document.querySelector('.leftHand'),
             liL = '';
         let keyR = document.querySelector('.rightHand'),
             liR = '';

         //  draw piano keys
         for(let i = 0; i < keyNum/2; i++){
             liL += '<li><span></span><i class="iCss">'+ keyText[i] +'</i></li>'
         }
         keyL.innerHTML = '<ul>'+ liL +'</ul>';
         for(let i = keyNum/2; i < keyNum; i++){
             liR += '<li><span></span><i class="iCss">'+ keyText[i]+'</i></li>'
         }
         keyR.innerHTML = '<ul>'+ liR +'</ul>';


         //为了在下面的函数里使用 本层的this 我们把this赋值 这样下的函数中可以直接使用
         let musicThis = this;
         $('.box').on('click','li',function () {
             let boxThis = $(this);
             let mark = $(this).children('i').text();
             //console.log(mark);
             musicThis.pressBtn(mark);
         });

     }

    createMusic(mark){

        let index = this.arrMarks.indexOf(mark);
        // console.log(this.arrMarks.indexOf('2%'));
        if(index !== -1){  //mark的序号和frequency是对应的
            this.createSound(this.arrFrequency[index]);
        }
    }




    pressBtn(mark) {
        // console.log(mark);
        this.createMusic(mark);
        //console.log(boxThis+'~'+mark);
            // let mark = $(this).children('i').text();
            // boxThis.css('background-color','rgba(0,0,0,.05)');
            // setTimeout(function () {
            //  boxThis.css('background-color','white');
            // },200);

    }


    playMusic(musicText) {
　　　　　　　
        let noteArr = musicText.split('');
        let delayTime = 1000 * 60;
         console.log(noteArr);

        (async () => {
            try{
                let i = 0;
                while (!this.paused) {
                    if(i >= noteArr.length){  // 停止或者循环
                        if(this.opts.loop){
                            i = 0;
                        }
                        else {
                            break;
                        }
                    }
                    let n = this.arrNotes.indexOf(noteArr[i]);  // 钢琴键位置
                    if(n !== -1){  // 发出乐音
                        console.log(n);
                        let mark = this.arrMarks[n];
                        this.pressBtn(mark);
                        if(n < 14){
                            $('.leftHand li').eq(n).css('background-color','rgba(0,0,0,.05)');
                            // boxThis.css('background-color','rgba(0,0,0,.05)');
                            setTimeout(function () {
                                $('.leftHand li').eq(n).css('background-color','white');
                            },200);

                        }else{
                            n = n - 14 ;
                            $('.rightHand li').eq(n).css('background-color','rgba(0,0,0,.05)');
                            setTimeout(function () {
                                $('.rightHand li').eq(n).css('background-color','white');
                            },200);

                        }
                        await sleep(20);
                    }
                    else{
                        switch (noteArr[i]) {
                            case '0': ;console.log('0');break; // 休止符
                            case '-': await sleep(delayTime / (2 * this.speed)) ;console.log('-'); break; // 八分音符时值
                            case '=': await sleep(delayTime / (4 * this.speed)) ;console.log('='); break; // 十六分音符时值
                            case '!': await sleep(delayTime / (8 * this.speed)) ;console.log('!'); break; // 32分音符时
                            default: await sleep(delayTime / this.speed); break; // 四分音符时值
                            //case '-':console.log('-');break;
                        }
                    }
                    i++;
                }
            }
            catch (e) {
                console.log('わからないw')
            }
        })();



    }

    pauseMusic(){
        this.paused = true;
    }

    setPlaySpeed(speed) {
        this.speed = speed;
    }



    // pressBtn(obj,i) {   // 按下钢琴键
    //     obj.className = 'cur';
    //     this.createSound(this.arrFrequency[i]);
    //     setTimeout(() => {
    //         this.musicBtn[i].className = '';
    //     },200);
    // }

}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
