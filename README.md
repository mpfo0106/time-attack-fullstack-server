## 배경

당신은 대기업의 신사업개발팀에 풀스택 개발자로 취업하였습니다. 이 대기업은 당근마켓, 중고나라를 참고한 중고거래 서비스의 개발을 고민하고 있습니다.

신사업개발팀장은 서비스 개발 여부를 최종적으로 결론 짓기에 앞서 일부 필수 기능만 담은 간단한 시제품을 만들어 보기로 결심했습니다.

패기 넘치는 신입 풀스택 개발자인 당신은 지금부터 12시간 내로 시제품을 만들어 보겠다고 공언했습니다.

팀장과 기획자는 다음의 요구사항들을 정리하여 당신에게 전달하였습니다.

---

## 요구사항

### 01. 기술

- Language - `Typescript`
- Frontend Framework - `Next.js (App Router)`
- Server Framework - `Nest.js`
- ORM - `Prisma`
- Database - `PostgreSQL`
- Database Cloud - `AWS RDS`
- Frontend State Management(Optional) - `Redux` or `ContextAPI`
- Server State Management(Required) - `React Query`
- Frontend Deployment - `Vercel`
- Backend Deployment - `Cloudtype`

### 02. 페이지 및 유저 스토리

1. **회원 가입 페이지 - `/auth/sign-up` [CSR]**
   - 사용자는 이메일과 비밀번호로 회원가입을 할 수 있습니다.
   - 이메일 주소는 유효한 형식이어야 하며 비밀번호는 8자 이상이어야 합니다.
   - 회원 가입이 완료된 사용자는 유저라고 지칭합니다.
   - 회원 가입을 완료한 사용자는 이메일과 비밀번호를 사용하여 유저로 로그인할 수 있습니다.
     - 로그인은 모달 방식으로 구현(가산점)되거나 페이지 방식(기본 점수)으로 구현될 수 있습니다.
2. **판매글 목록 페이지 - `/` [SSR]**
   - 사용자와 유저는 판매글을 최신순(기본값), 조회순, 관심순으로 정렬하여 볼 수 있습니다.
   - 사용자와 유저는 판매글 목록 페이지의 판매글을 눌러 상세 페이지로 이동할 수 있습니다.
3. **판매글 생성 페이지 - `/deals/create` [CSR]**
   - 유저는 판매글을 생성할 수 있습니다.
   - 판매글 작성시에는 판매 상품 이미지, 제목, 내용, 가격, 위치의 다섯 가지 정보가 입력되어야 합니다.
4. **판매글 상세 페이지 - `/deals/:dealId` [SSR]**
   - 사용자와 유저는 판매글의 상세 내용을 조회할 수 있습니다.
   - 유저는 다른 유저의 판매글에 관심을 표하거나 관심을 취소할 수 있습니다.
   - 판매글을 작성한 유저는 판매글 상세 페이지에서 해당 판매글을 삭제할 수 있습니다.
5. **판매글 수정 페이지 - `/deals/:dealId/edit` [CSR]**
   - 판매글을 작성한 유저는 판매글 수정 페이지에 진입하여 판매글을 수정할 수 있습니다.
6. **내 판매글 페이지 - `/my/deals` [SSR]**
   - 페이지 내에서 탭 방식으로 아래의 두 개 내용을 볼 수 있습니다.
     - 유저는 자신이 작성한 판매글들의 목록을 볼 수 있습니다.
     - 유저는 자신이 관심을 표한 판매글들의 목록을 볼 수 있습니다.

### 03. 그 외 필수 요구사항

- API는 RESTful 해야 합니다.
- 인증은 JWT을 Bearer Token으로 사용하여 구현하며 토큰은 발급일시 기준 2시간 뒤 만료되어야 합니다.
- API 서버로부터의 모든 응답은 다음의 JSON 형태여야 합니다.
  ```tsx
  {
  	"success": boolean,
  	"result": T,
  	"message": string
  }
  ```

### 04. 디자인

- 홈페이지 (판매글 목록페이지)
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/46c56e05-258c-4112-872e-3216a4d34e6a/2d61c0e9-6724-482e-97be-95e2082da6d7/Untitled.png)
- 판매글 상세 페이지
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/46c56e05-258c-4112-872e-3216a4d34e6a/f57a650c-ec1d-4f4d-aee5-9f6c6ea71718/Untitled.png)
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/46c56e05-258c-4112-872e-3216a4d34e6a/c42def8b-ca34-4bed-82a3-e4473d902abb/Untitled.png)
- 판매글 작성 페이지
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/46c56e05-258c-4112-872e-3216a4d34e6a/8d1198b2-cbe2-4fd1-abcd-4360dbf30773/Untitled.png)
- 판매글 수정 페이지
- 회원 가입 페이지
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/46c56e05-258c-4112-872e-3216a4d34e6a/f0a34890-c030-4524-b5bc-eea87c005b65/Untitled.png)
- 로그인 페이지 또는 로그인 모달
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/46c56e05-258c-4112-872e-3216a4d34e6a/8a2731c7-308d-40df-b573-b06b1601bc25/Untitled.png)

---

- 배포는 타임어택 종료 후에 저와 함께 진행하겠습니다. 걱정 마세요~!
- 2024년 2월 27일 화요일 오전 10시부터 2024년 2월 28일 수요일 저녁 6시까지
- 프론트엔드에서 이미지를 백엔드로 보내는 방법은 요청하는 분에 한해서 같이 도와드리겠습니다.

그럼 건투를 빕니다.
