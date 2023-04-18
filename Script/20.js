document.addEventListener("DOMContentLoaded", () => {
    const boxs = document.querySelectorAll('.box');
    const bt1 = document.querySelector('#bt1');


    //초기 배열 : 1이 초기 폭탄 위치
    let arr = [0, 0, 0, 0, 0, 0, 0, 0, 1];
    //클릭확인
    let flag = true;
    //하트 개수
    let cnt = 0;
    //눌러진 순서
    let selarr = [];

    //폭탄섞기 버튼
    bt1.addEventListener('click', () => {
        if (flag)  //(flag == true)
        {
            arr.sort(() => Math.random() - 0.5);
            console.log(arr);
            flag = false;
            cnt = 0;
            selarr = 0;
            document.querySelector('h2').innerHTML = '';
            for (let box of boxs) {
                box.innerHTML = box.getAttribute('id').slice(-1);
                //box.innerHTML = box.getAttribute('id').replace('box', '');
            }
        }
    });


    //div 박스 제어
    for (let box of boxs) {
        //박스에 번호 넣기
        box.innerHTML = box.getAttribute('id').slice(-1);
        //box.innerHTML = box.getAttribute('id').replace('box','');

        //클릭이벤트 처리
        box.addEventListener('click', () => {
            //let n = parseInt(box.getAttribute('id').replace('box', ''));
            let n = parseInt(box.textContent);

            //기존에 하트나 폭탄이 들어있는 경우
            if (isNaN(n)) return;

            //폭탄이 눌러지지 않은 경우
            if (!flag) {
                //선택 항목 추가
                selarr.push(n);
                console.log('n=', n, 'selarr=' , selarr);
                cnt++;
                console.log("cnt=", cnt)


                //폭탄 하트 구분
                if (arr[n - 1] == 0) {
                    //하트
                    box.innerHTML = '<img src="./img/hart.png">'

                    if (cnt == 8) {
                        flag = true;
                        document.querySelector('h2').innerHTML = '성공';

                        //차집합 이용
                        // let lastArr = [1,2,3,4,5,6,7,8,9].filter((item)=> !selarr.includes(item))
                        // console.log(lastArr[0])
                        // boxs[lastArr[0]-1].innerHTML = '<img src="./images/hart.png">';

                        //1이 있는 위치 찾기
                        let lastn = arr.findIndex((item)=>item == 1) ;
                        console.log('find=', lastn);
                        boxs[lastn].innerHTML = '<img src="./images/hart.png">';
                    }
                }
                else {
                    //폭탄
                    box.innerHTML = '<img src="./img/boom.png">';
                    flag = true;
                    document.querySelector('h2').innerHTML = '실패';
                }

            }
        });
    }
});