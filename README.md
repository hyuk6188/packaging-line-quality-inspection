# 일일 포장라인 품질점검 현황

여러 PC에서 같은 Google Sheet를 저장소로 사용해 등록 내용을 공유하는 GitHub Pages 대시보드입니다.

## Google Sheets 연결

전용 시트: https://docs.google.com/spreadsheets/d/1L2njUjenWShSnQPGfqAIlBKA1A_yhwg-mTvRlQSXAw4/edit

1. 전용 시트를 열고 `확장 프로그램 > Apps Script`를 선택합니다.
2. 기본 코드를 삭제하고 `google-sheets-web-app.gs` 내용을 붙여 넣은 뒤 저장합니다.
3. `배포 > 새 배포 > 웹 앱`을 선택합니다.
4. 실행 사용자는 `나`, 액세스 권한은 `모든 사용자`로 설정하고 배포합니다.
5. 발급된 `/exec` URL을 `config.js`의 `googleSheetsWebAppUrl`에 입력합니다.
6. 변경 내용을 커밋하고 푸시하면 공개 페이지에 반영됩니다.

## 동작

- `Google Sheets에 저장` 버튼으로 공용 상태를 저장합니다.
- 페이지 시작 시 및 15초마다 최신 상태를 불러옵니다.
- 입력 중인 미저장 내용은 자동 새로고침으로 덮어쓰지 않습니다.
