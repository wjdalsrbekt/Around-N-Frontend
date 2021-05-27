![image](/uploads/a8d787985695429c6113575d477fa0d9/image.png)

# Around : N
- Around:N 은 사용자끼리의 커뮤니티들 형성하여 
소비자의 합리적인 선택을 적극 권장 합니다.
활발한 의견공유를 통해 나만의 SWEET HOME을 만나보세요!

- 기분좋게 매물 보러 가볼까요?
집 보러 가는날, 맑은 날이면 더욱 좋겠지요?
해당 동네 날씨 확인하고 기분 좋게 길찾기 해봐요!

- 내 매물은 과연 N세권?
맥세권이라는 말을 아시나요? 
주택 인근에 맥도날드가 가까운 경우를 뜻하는 말이에요.

- Around:N은 사용자가 선택한 매물이 주변의 약국, 편의점, 문화공간 등 
다양한  N세권에 포함되는지 바로 확인가능하답니다.


## 주요기능
<a href ="https://www.youtube.com/watch?v=usJ1UsJBG_M">서비스 소개 영상</a>


프로젝트에 관하여
삼성청년 소프트웨어 아카데미 5기 1학기 최종프로젝트 12조

화면 설계
메인
![image](/uploads/a3a2b27c42632a4df3546dadf36ea9c0/image.png)
1. 홈 아이콘을 클릭 시 메인 vue로 이동합니다.
2. 게시판 탭을 클릭 시 게시판 vue로 이동합니다.
3. 로그인 탭을 클릭 시 로그인 vue로 이동합니다. 
	3-1. 로그인 상태일 경우 로그아웃 탭으로 변환됩니다.
4. 회원가입 탭을 클릭 시 회원가입 vue로 이동합니다.
	4-1. 로그인 상태일 경우 회원정보 탭으로 변환됩니다.
5. 매물 탭을 클릭 시 매물 vue로 이동합니다.

![image](/uploads/18f9a44a877a4ed1227b61f3b7b59f7b/image.png)
6. 모든 페이지에 페이지스크롤러를 나타나게 하여 클릭 시 현재 페이지 top으로 이동합니다.

회원가입
![image](/uploads/f60ce2d17a81b0b47f2c10b749fdc780/image.png)
1. 검사를 한 아이디만 가입이 가능합니다. 검사 클릭시 DB상에 존재하지 않는 아이디만 flag값을 true로 바꿔줍니다. watch를 사용하여 아이디값이 변경되면 false로 값이 변경되어 다시 검사를 수행해야 합니다.
2. 아이디를 입력합니다. 필수입력사항입니다. 입력하지 않을 시 rule로 경고를 줍니다. ref를 주어 입력하지 않고 진행 시 해당 input으로 이동합니다.
3. 이름을 입력합니다. 필수입력사항입니다. 입력하지 않을 시 rule로 경고를 줍니다. ref를 주어 입력하지 않고 진행 시 해당 input으로 이동합니다.
4. 비밀번호를 입력합니다. 필수입력사항입니다. 입력하지 않을 시 rule로 경고를 줍니다. ref를 주어 입력하지 않고 진행 시 해당 input으로 이동합니다.

![image](/uploads/886eebc0965f66fc7e6b8b256b2f4a07/image.png)
5. 주소를 입력합니다. 필수입력사항입니다. 입력하지 않을 시 rule로 경고를 줍니다. ref를 주어 입력하지 않고 진행 시 해당 input으로 이동합니다.
6. 이메일을 입력합니다. 필수입력사항입니다. 입력하지 않을 시 rule로 경고를 줍니다. ref를 주어 입력하지 않고 진행 시 해당 input으로 이동합니다.
7. 회원가입을 진행합니다. 필수입력사항을 만족하지 않을 경우, ref를 연결하여 해당 input에 focus를 줍니다. 모두 만족하고, 아이디 검사까지 진행했다면 가입성공 alert를 호출합니다.

로그인
![image](/uploads/659ce3574e9fcaaaf78e101c0cb10394/image.png)
1. 아이디를 입력합니다. 필수입력사항입니다. 입력하지 않을 시 rule로 경고를 줍니다. ref를 주어 입력하지 않고 진행 시 해당 input으로 이동합니다.
2. 비밀번호를 입력합니다. 필수입력사항입니다. 입력하지 않을 시 rule로 경고를 줍니다. ref를 주어 입력하지 않고 진행 시 해당 input으로 이동합니다.
3. 아이디와 비밀번호가 입력된 상태에서 진행할 경우 결과에 따라 alert를 호출합니다. 모두 일치했다면 성공alert를, 일치하는 정보가 DB에 없다면 실패alert를 호출합니다.

로그아웃
![image](/uploads/354ef4fc8d396bec68a0a5626ec31d5c/image.png)
1. 로그인 상태에서 로그아웃을 클릭할 경우 로그아웃이 수행됩니다.

게시판
![image](/uploads/b36fa5ac6c22dbad8702ad98808f1b31/image.png)
1. 글 제목을 입력할때마다 includes를 사용하여 해당 단어를 포함한 게시글 리스트만을 보여줍니다.

![image](/uploads/c347c52af421ca3e1c99303959ce7124/image.png)
2. 게시판 리스트에서 제목을 클릭하면 해당 글 상세보기로 이동합니다.
3. 게시글을 작성합니다. 로그인 상태에서만 가능합니다. 로그인 상태가 아니라면 alert를 호출합니다.

![image](/uploads/ac9a616fe70e08ac703d4339e69a53ca/image.png)
4. 글 상세보기입니다. 로그인 상태가 아니고, 해당 글의 작성자가 아니라면 수정, 삭제 버튼이 나타나지 않습니다.
![image](/uploads/0d545793b81772667192fbfbe099a930/image.png)
5. 로그인 상태이고, 해당글의 작성자라면 수정, 삭제 버튼이 나타납니다.
5-1. 수정버튼 클릭 시 수정 vue로 이동합니다.
5-2. 삭제버튼 클릭 시 2초 간의 loading 후 삭제 성공 alert가 호출됩니다.

![image](/uploads/4d179ad0db70667485260aef6084c149/image.png)
![image](/uploads/a1ad807f389bc4471fef4a83ee1a47aa/image.png)
게시글 작성 vue입니다. 
1. 제목을 입력합니다. 필수입력사항입니다. 입력하지 않을 시 rule로 경고를 줍니다. ref를 주어 입력하지 않고 진행 시 해당 input으로 이동합니다.
2. 문의가격을 입력합니다. 필수입력사항입니다. 입력하지 않을 시 rule로 경고를 줍니다. ref를 주어 입력하지 않고 진행 시 해당 input으로 이동합니다.
3. 추가사진을 첨부합니다. 선택입력사항입니다. 이미지파일 포맷(.jpg, .png, .gif) 만 첨부 가능하며 최대 용량제한은 5MB입니다.
4. 게시글을 작성합니다. 필수입력사항입니다.
5. 등록 혹은 취소를 진행합니다.

![image](/uploads/8338da6fadebe2005c2f3d2124ba05be/image.png)
수정화면 vue입니다. 
해당 글의 정보를 불러오게 하였습니다.
1. 추가된 사진이 없다면 추가할 수 있고, 있다면 갱신할 수 있습니다.
2. 수정된 게시물을 수정 혹은 취소합니다.

![image](/uploads/aa146fdc1cc0766b9e2a73da9b740774/image.png)
해당 글에 댓글이 달렸을 경우 댓글 리스트가 나타납니다.
1. 댓글내용을 검색가능합니다.
2. q-table sortable을 사용하여 댓글번호, 작성자, 댓글내용, 댓글시간으로 정렬이 가능합니다.
3. 댓글을 삭제합니다. 본인만이 댓글을 삭제할 수 있습니다.
4. 댓글을 입력합니다. 로그인된 상태에서만 작성이 가능합니다.

회원정보 수정
![image](/uploads/1467cfffd61ac6d27e2b25893dc50216/image.png)
회원정보수정 vue입니다.
1. 아이디는 수정할 수 없습니다.
2. 이름을 수정합니다. 필수입력사항입니다. 입력하지 않을 시 rule로 경고를 줍니다. ref를 주어 입력하지 않고 진행 시 해당 input으로 이동합니다.
3. 비밀번호를 수정합니다. 필수입력사항입니다. 입력하지 않을 시 rule로 경고를 줍니다. ref를 주어 입력하지 않고 진행 시 해당 input으로 이동합니다.
4. 주소를 수정합니다. 필수입력사항입니다. 입력하지 않을 시 rule로 경고를 줍니다. ref를 주어 입력하지 않고 진행 시 해당 input으로 이동합니다.
5. 이메일을 수정합니다. 필수입력사항입니다. 입력하지 않을 시 rule로 경고를 줍니다. ref를 주어 입력하지 않고 진행 시 해당 input으로 이동합니다.

![image](/uploads/7ace51d5e49c09dcd8b3c1dd07805a8e/image.png)
1. 수정을 진행합니다.
2. 회원탈퇴를 진행합니다. confirm창으로 ‘네’를 선택 시 탈퇴가 진행됩니다. ajax bar와 loading을 사용하여 3.5초 로딩시간을 주었고, DB에서 해당 유저 삭제가 진행됩니다.

![image](/uploads/f236a0af02d4e1470dde1a49a1fa25e1/image.png)
![image](/uploads/1ff58545c819e84a5c6e65be5635310b/image.png)
매물
![image](/uploads/483ce658a12cfb2c0bd5d3a9e3f321e6/image.png)
매물 vue입니다.
1. 동 혹은 아파트 이름을 select합니다. 필수입력사항입니다.
2. 검색할 키워드를 입력합니다. 동 선택 시 DB에서 완전일치, 아파트 이름은 부분일치 정보를 보여줍니다. keypress이벤트를 주어 엔터입력시 바로 검색이 진행됩니다.
3. 검색합니다. 매물리스트 컴포넌트에 리스트가 나타나게됩니다.

![image](/uploads/1e9a74b157aa499f2edfefb11e2e5b16/image.png)
![image](/uploads/42630321294845eda556bce65084d2b6/image.png)
1. 매물리스트에서 list item을 선택 시 지도에 마커가 표시됩니다.

![image](/uploads/9d764496bfa1d279086244770fd243ff/image.png)
1. 해당 버튼을 클릭하면 서치바, 리스트 컴포넌트 drawer가 접어지게 됩니다. 다시 클릭하면 나타납니다.

![image](/uploads/209092f619985fda7c1f48a49689464d/image.png)
1. 각 마커를 클릭 시 지도의 사용자 바운더리 안에 존재하는 해당 편의시설을 마커로 표시해줍니다. 바운더리를 이동 시 카카오 맵 API를 이용하여 바로 정보를 실시간으로 받아옵니다. 은행, 마트, 약국, 주유소, 카페, 편의점, 음식점, 지하철역, 문화시설 총 9가지의 편의시설 마커를 제공합니다.

![image](/uploads/c9dd25958c9aa1d2301cf21ad063d259/image.png)
1. 지도는 확대,축소기능과 교통정보, 자전거도로 정보를 제공합니다. 교통정보와 자전거 도로 두가지 선택도 가능합니다.

![image](/uploads/11dc7274cab4d5d8c37c203eb032f9d6/image.png)
1. 지도에서 해당 마커의 길찾기를 클릭하면 새 창으로 길찾기가 가능합니다.

팀
정민규 (팀장)
-BackEnd : SpringBoot REST Server 구상 및 구축
-DataBase : SCHEMA, TABLE, VIEW 구조 
-FrontEnd : 게시판, 회원 관련 스타일링
            오픈웨더 API 구현 (날씨 정보)
            
노영주 (팀원)
-FrontEnd : Vue/Vuex/Quasar 구상 및 구축
            (매물, 게시글, 댓글, 로그인, 로그아웃)
            매물, 메인페이지, 이벤트 스타일링
            KAKAO Map API 구현 (마커연결 및 디자인)
-BackEnd : 회원 관련 기능 추가

프로젝트 일정
![image](/uploads/f0ce58e598679a3f7db190eefe4a91a1/image.png)

프로젝트 구조
![image](/uploads/0ebab3aaf7642ea80220f928698e39ad/image.png)

▶ 헤더를 통해 각각의 페이지에 접근이 가능합니다.
▶ 회원이 로그인 상태이면 회원수정이, 로그인 되어있지 않은 상태면 회원가입 탭이 나타납니다.

프로젝트 아키텍쳐
![image](/uploads/69eba336b9bd88f66e21f0d9f73b598d/image.png)

개발 패턴
![image](/uploads/ef6b1afff311db2d0a24a5ec500b4a12/image.png)

## ✅ToDoList
 - <a href="https://www.notion.so/ToDoList-365d57b9da7f4cd2a4f8ece3515297f0 ">5월 19일</a>

5월 20일
https://www.notion.so/ToDoList-770706e9e78d4d81a53a24139725d956
5월 21일
https://www.notion.so/ToDoList-58c483ef691449b8acb6c79000db2fa0
5월 22일
https://www.notion.so/ToDoList-d485b3cdfe2c4d6aa5af8d9a7ca5e140
5월 23일
https://www.notion.so/ToDoList-147f1c111fbc42cc9e4d56a7deca34c8
5월 24일
https://www.notion.so/ToDoList-69a7b994c9224e8fa03932e6dd3ab442
5월 25일
https://www.notion.so/ToDoList-fb2d325a715d4590b24b2cd9fb67bd8d
5월 26일
https://www.notion.so/ToDoList-e3fb12d746314a1ba20991228e5737dc
5월 27일
https://www.notion.so/ToDoList-911390391c0a4039b0d32e2df48dea96

## ✏프로젝트 후기

##### 노영주
 - 한학기 동안 배운 것들을 정리할 수 있는 시간이였습니다.
새로운 것들도 배웠고, 좋은 팀원분과 함께 개발하며 즐거웠습니다.
프로젝트를 하며 느꼈던 부족한 점들을
보완하여 다음에는 더 발전한 프로젝트를 진행하고 싶습니다.

##### 정민규
 - 비대면 협업을 통하여 프로젝트를 완성 시켜야 하다보니 
걱정이 많았습니다. 하지만 git을 통한 코드 관리와 웹엑스, 구글meet으로 의견을 충분히 주고받은 후, 노션을 통하여 to-do-list를 적어 
당일 목표를 정해놓고 프로젝트를 진행하니 
오히려 장소에대한 제약이 있지않아 더욱 좋았습니다. 
또한, 1학기 때 배운 Backend와 Frontend 기술스택 을 이용하고, 
새로운 Framework인 퀘이사를 공부, 적용시켜 
원활히 프로젝트가 동작할땐 정말 짜릿하였습니다.

### 라이센스
 > This is released under the MIT license. See LICENSE for details.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
