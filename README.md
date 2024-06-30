# 스타레일 업적 사전
Next.js 기반으로 제작한 [붕괴: 스타레일](https://hsr.hoyoverse.com)의 업적들을 정리한 프로젝트 입니다

## 개발 계기
같은 게임 회사의 작품인 [원신](https://genshin.hoyoverse.com)에선 업적들을 정리한 웹 사이트들이 많이 있지만 최근에 출시 된 스타레일은 출시된지 얼마 되지 않아, 이 프로젝트 만들기 전에 이를 기반한 웹 사이트가 없어 직접 메모해야 되거나 정리를 해야되는 문제가 있기 때문에 직접 프로젝트를 만들었습니다

아직 [Next.js](https://nextjs.org)를 제대로 배운 사람이 아니다 보니 다른 웹 사이트처럼 오류 없이 완벽하거나 편하지는 않지만 가능할 경우 문제가 발생될 수 있는 오류를 해결하거나 편의성을 개선할 계획입니다

## 설치 및 실행 방법
우선 [Node.js v20](https://nodejs.org) 최신 버전 (권장)으로 설치한 다음에, Git으로 프로젝트를 복사하거나 압축 풀어주시기 바랍니다. 그런 다음에 해당 프로젝트가 있는 디렉토리로 가서 터미널로 다음 명령어를 입력해 주시면 됩니다

```
npm i
```

라이브러리들이 모두 설치되었다면 이제 Next.js 프로젝트를 빌드할 차례입니다

```
npm run build
```

프로젝트가 무사히 빌드되었다면 다음 명령어를 통해 웹 서버 실행합니다

```
npm run start
```

## 현재 적용된 기능
* 검색 기능
* 업적 클리어 확인 체크
* 업적 필터 기능
* 클리어 개수, 획득한 성옥 개수 업데이트
* 라이트 / 다크 테마 기능
* 데스크톱, 모바일 UI 업데이트
* 다국어 선택 지원

## 지원 언어
* 한국어 - Korean
* 영어 - English
* 일본어 - Japanese 
* 중국어 (간체) - Simplified Chinese
* 중국어 (번체) - Traditional Chinese
* 베트남어 - Vietnamese
* 태국어 - Thai
* 러시아어 - Russian
* 인도네시아어 - Indonesian
* 스페인어 - Spanish
* 덴마크어 - Danish
* 프랑스어 - French
* 포르투갈어 - Portuguese

### 사용된 리소스 및 라이브러리
* [Wanted Sans 폰트](https://github.com/wanteddev/wanted-sans)
* [Tailwind CSS](https://tailwindcss.com)
* [shadcn/ui](https://ui.shadcn.com)