class MusicBox {
    constructor(selectorL,selectorR,options){
        // 默认值

        let defaults = {
            type: 'sine',  // 音色类型  sine|square|triangle|sawtooth
            duration: 2  // 键音延长时间
        };
        this.selectorL = selectorL;
        this.selectorR = selectorR;

        this.opts = Object.assign(defaults, options);

        // 创建新的音频上下文接口
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.arrFrequency = [
      //left-hand (HZ)
         33,37,41,43,49,55,62,65,73,82,87,98,110,124,130,147,165,175,196,220,247,
      //right-hand (HZ)
            262, 294, 330, 349, 392, 440, 494, 523, 587, 659, 698, 784, 880, 988, 1047, 1175, 1319, 1397, 1568, 1760, 1967];
        this.arrMarks = [
            //left-hand (mark)
            '!1', '!2', '!3', '!4', '!5', '!6', '!7', '@1','@2', '@3', '@4', '@5', '@6', '@7', '#1', '#2', '#3', '#4', '#5', '#6', '#7',
            //right-hand (mark)
            '1$','2$','3$','4$','5$','6$','7$','1%','2%','3%','4%','5%','6%','7%','1^','2^','3^','4^','5^','6^','7^',];
    
        this.draw();
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
    createMusic(mark){

        let index = this.arrMarks.indexOf(mark);
        if(index !== -1){  //mark的序号和frequency是对应的
            this.createSound(this.arrFrequency[index]);
        }
    }
    draw(){    // draw piano
        this.musicBtn = null;

        let keyL = document.querySelector(this.selectorL),
            liL = '';
        let keyR = document.querySelector(this.selectorR),
            liR = '';
            // iCss = '';

      //  draw piano keys
        for(let i = 0; i < this.arrFrequency.length/2; i++){
            liL += '<li><span></span><i class="iCss">'+ this.arrMarks[i] +'</i></li>'
        }
        keyL.innerHTML = '<ul>'+ liL +'</ul>';
        for(let i = this.arrFrequency.length/2; i < this.arrFrequency.length; i++){
            liR += '<li><span></span><i class="iCss">'+ this.arrMarks[i]+'</i></li>'
        }
        keyR.innerHTML = '<ul>'+ liR +'</ul>';




        // // piano keys addEventListener
        // let oLi = musicBtns.querySelectorAll('li');
        // for(let i = 0; i < this.arrFrequency.length; i++){
        //     oLi[i].addEventListener('mousedown',(e)=>{
        //         this.pressBtn(e.target,i);
        //     })
        // }
        //
        // this.musicBtn = musicBtns.querySelectorAll('li span');
        //
        // // 鼠标起来时样式消失
        // document.onmouseup = () => {
        //     for(let i = 0; i < this.arrFrequency.length; i++){
        //         this.musicBtn[i].className = '';
        //     }
        // };
    }

    // pressBtn(obj,i) {   // 按下钢琴键
    //     obj.className = 'cur';
    //     this.createSound(this.arrFrequency[i]);
    //     setTimeout(() => {
    //         this.musicBtn[i].className = '';
    //     },200);
    // }

}