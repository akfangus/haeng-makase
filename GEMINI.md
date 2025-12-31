# 프로젝트

- **언어:** 한국어 (모든 답변 및 계획)
- **기술 스택:** React, Next.js v15 (App Router), TypeScript, Tailwind CSS, Zustand, React Query (TanStack Query)
- **스타일:** 함수형 프로그래밍 선호, 선언적 코드 작성, 엄격한 TypeScript 사용.

---

# 좋은 코드를 위한 4가지 기준 (Frontend Fundamentals)

> "좋은 프론트엔드 코드는 변경하기 쉬운 코드입니다."

## 1. 가독성 (Readability)

코드가 읽기 쉬워야 변경하기도 쉽습니다. 맥락을 줄이고, 명확한 이름을 사용하며, 위에서 아래로 자연스럽게 읽히도록 작성합니다.

### A. 맥락 줄이기

**1. 같이 실행되지 않는 코드 분리하기**

서로 다른 상태(예: 뷰어 vs 관리자)에 따라 실행되는 로직이 섞여 있으면 이해하기 어렵습니다. 컴포넌트를 분리하세요.

```typescript
// ❌ 나쁜 예시: 두 가지 권한 로직이 섞여 있음
function SubmitButton() {
  const isViewer = useRole() === "viewer";
  useEffect(() => {
    if (isViewer) return;
    showButtonAnimation();
  }, [isViewer]);

  return isViewer ? (
    <TextButton disabled>Submit</TextButton>
  ) : (
    <Button type="submit">Submit</Button>
  );
}

// ✅ 좋은 예시: 역할별로 컴포넌트 분리
function SubmitButton() {
  const isViewer = useRole() === "viewer";
  return isViewer ? <ViewerSubmitButton /> : <AdminSubmitButton />;
}

function ViewerSubmitButton() {
  return <TextButton disabled>Submit</TextButton>;
}

function AdminSubmitButton() {
  useEffect(() => {
    showButtonAnimation();
  }, []);
  return <Button type="submit">Submit</Button>;
}
```

**2. 구현 상세 추상화하기**

핵심 로직이 아닌 세부 구현(예: 리다이렉트 처리)은 별도 훅이나 컴포넌트로 추상화하여 본문을 깔끔하게 만듭니다.

```typescript
// ❌ 나쁜 예시: 비즈니스 로직과 세부 구현이 섞임
function LoginStartPage() {
  useCheckLogin({
    onChecked: (status) => {
      if (status === "LOGGED_IN") location.href = "/home";
    },
  });
  return <>{/* ... */}</>;
}

// ✅ 좋은 예시: AuthGuard로 추상화
function App() {
  return (
    <AuthGuard>
      <LoginStartPage />
    </AuthGuard>
  );
}

function AuthGuard({ children }: { children: React.ReactNode }) {
  const status = useCheckLoginStatus();
  useEffect(() => {
    if (status === "LOGGED_IN") location.href = "/home";
  }, [status]);
  return status !== "LOGGED_IN" ? children : null;
}
```

**3. 로직 종류에 따라 합쳐진 함수 쪼개기**

하나의 Hook이 너무 많은 책임(예: 모든 쿼리 파라미터 관리)을 가지지 않도록 분리합니다.

```typescript
// ❌ 나쁜 예시: 모든 쿼리 파라미터를 한 곳에서 관리
export function usePageState() {
  const [query, setQuery] = useQueryParams({ cardId: NumberParam, dateFrom: DateParam, ... });
  // ... 복잡한 로직 ...
}

// ✅ 좋은 예시: 개별 책임으로 분리
export function useCardIdQueryParam() {
  const [cardId, setCardId] = useQueryParam("cardId", NumberParam);
  return [cardId, setCardId] as const;
}
```

### B. 이름 붙이기

**1. 복잡한 조건에 이름 붙이기**

```typescript
// ❌ 나쁜 예시
if (products.filter(p => p.categories.some(c => c.id === target.id && p.prices.some(pr => pr >= min && pr <= max)))) { ... }

// ✅ 좋은 예시: 의미 있는 변수명 사용
const matchedProducts = products.filter((product) => {
  const isSameCategory = product.categories.some(c => c.id === targetCategory.id);
  const isPriceInRange = product.prices.some(p => p >= minPrice && p <= maxPrice);
  return isSameCategory && isPriceInRange;
});
```

**2. 매직 넘버에 이름 붙이기**

```typescript
// ❌ 나쁜 예시
await delay(300);

// ✅ 좋은 예시
const ANIMATION_DELAY_MS = 300;
await delay(ANIMATION_DELAY_MS);
```

### C. 위에서 아래로 읽히게 하기

**1. 시점 이동 줄이기**

```typescript
// ❌ 나쁜 예시: 정의된 객체(POLICY_SET)를 확인하기 위해 시선을 이동해야 함
function Page() {
  const policy = getPolicyByRole(user.role); // getPolicyByRole -> POLICY_SET 확인 필요
  return <Button disabled={!policy.canInvite}>Invite</Button>;
}

// ✅ 좋은 예시: switch문으로 흐름을 바로 파악 가능
function Page() {
  switch (user.role) {
    case "admin": return <Button disabled={false}>Invite</Button>;
    case "viewer": return <Button disabled={true}>Invite</Button>;
  }
}
```

**2. 삼항 연산자 단순하게 하기**

중첩된 삼항 연산자 대신 `if-return` 패턴이나 IIFE를 사용합니다.

**3. 왼쪽에서 오른쪽으로 읽히게 하기**

범위 비교 시 자연스러운 순서로 작성합니다.
- `80 <= score && score <= 100` (O)
- `score >= 80 && score <= 100` (X - score가 두 번 등장하여 인지 부하)

---

## 2. 예측 가능성 (Predictability)

함수나 컴포넌트의 이름, 파라미터, 반환 타입만 보고도 동작을 예측할 수 있어야 합니다.

### A. 이름 겹치지 않게 관리하기

```typescript
// ❌ 나쁜 예시: 라이브러리 이름과 서비스 함수 이름이 같음
import { http } from "./http"; // 이게 라이브러리인지 커스텀 함수인지 모호함

// ✅ 좋은 예시: 명확한 네이밍
import { httpService } from "./httpService";
```

### B. 같은 종류의 함수는 반환 타입 통일하기

```typescript
// ❌ 나쁜 예시: 하나는 Query 객체, 하나는 data만 반환
function useUser() { return useQuery(...); }
function useServerTime() { return useQuery(...).data; }

// ✅ 좋은 예시: 모두 Query 객체 반환으로 통일
function useUser() { return useQuery(...); }
function useServerTime() { return useQuery(...); }
```

### C. 숨은 로직 드러내기

함수명에 없는 부수 효과(로깅 등)를 숨기지 마세요.

```typescript
// ❌ 나쁜 예시: fetchBalance인데 내부에서 로깅을 함
async function fetchBalance() {
  logging.log("fetched"); // 숨겨진 로직
  return http.get(...);
}

// ✅ 좋은 예시: 로직 분리 또는 이름 변경
async function fetchBalance() {
  return http.get(...);
}
// 사용하는 곳에서 명시적으로 로깅
const balance = await fetchBalance();
logging.log("fetched", balance);
```

---

## 3. 응집도 (Cohesion)

함께 수정되어야 할 코드는 한곳에 모읍니다.

### A. 디렉토리 구조 (FSD 아키텍처 준수)

이 프로젝트는 **Feature-Sliced Design (FSD)** 방법론을 엄격히 따릅니다. 이는 '함께 수정되는 것은 함께 둔다'는 응집도 원칙을 체계화한 구조입니다.

**계층(Layers) 구조** (위에서 아래로만 의존 가능):

1.  **app/**: 애플리케이션 진입점. (Providers, Global Styles, Layouts 등)
2.  **pages/**: 페이지 단위 컴포넌트. Next.js의 라우팅 구조를 따르되, 로직은 최소화하고 Widgets/Features를 조합하는 역할만 수행합니다.
3.  **widgets/**: 페이지에 사용되는 독립적인 UI 블록. (예: `Header`, `Sidebar`, `ArticleList` - Feature와 Entity를 조합)
4.  **features/**: 사용자 상호작용이 포함된 비즈니스 기능. (예: `auth-login`, `add-to-cart`, `like-post`)
5.  **entities/**: 비즈니스 도메인 데이터와 그 데이터를 보여주는 UI. (예: `user`, `product`, `order` - `UserCard` 같은 순수 뷰 컴포넌트 포함)
6.  **shared/**: 특정 도메인에 종속되지 않는 공용 코드. (예: `ui-kit`, `lib`, `api-client`, `utils`)

**핵심 규칙:**

*   **단방향 의존성:** 상위 레이어는 하위 레이어만 import 할 수 있습니다. (예: `features`는 `entities`와 `shared`를 사용할 수 있지만, `widgets`를 사용할 수 없음)
*   **Public API:** 각 슬라이스(폴더)는 `index.ts`를 통해서만 외부로 기능을 노출해야 합니다. (캡슐화)
*   **슬라이스 간 격리:** 동일 레이어의 다른 슬라이스(예: `features/auth`와 `features/cart`)는 서로 직접 import 하지 않습니다.

```text
// ✅ FSD 구조 예시
src/
  app/          # 전역 설정
  pages/        # 라우트 페이지
  widgets/      # UserProfile, Header
  features/     # LoginButton, SearchBar
  entities/     # User(model+ui), Post(model+ui)
  shared/       # Button, Input, axios
```

### B. 폼의 응집도 생각하기

React Hook Form 등을 사용하여 필드별 검증 로직을 필드와 가까운 곳에 둡니다.

```tsx
// ✅ 좋은 예시
<input
  {...register("email", {
    validate: (value) => isEmail(value) ? "" : "이메일 형식이 아닙니다"
  })}
/>
```

---

## 4. 결합도 (Coupling)

한 곳을 수정했을 때 다른 곳이 망가지지 않도록 의존성을 줄입니다.

### A. 책임을 하나씩 관리하기

거대한 `usePageState` 대신 `useCardId`, `useDateRange` 등으로 책임을 잘게 쪼개어, 하나의 변경이 전체에 영향을 주지 않도록 합니다.

### B. 중복 코드 허용하기

무리한 공통화(DRY)가 오히려 강한 결합을 만들 수 있습니다. 로직이 미묘하게 다르다면, 억지로 합치지 말고 중복을 허용하여 독립성을 유지하세요.

### C. Props Drilling 지우기

중간 컴포넌트가 불필요한 Props를 알게 하지 마세요.

**1. Composition (조합) 패턴 활용**

```tsx
// ❌ 나쁜 예시: ItemEditBody가 items를 받아서 ItemEditList에 전달
<ItemEditBody items={items} ... />

// ✅ 좋은 예시: children 활용
<ItemEditBody>
  <ItemEditList items={items} />
</ItemEditBody>
```

**2. Context API 활용**

Props가 너무 깊다면 도메인별 Context를 만들어 필요한 곳에서 직접 데이터를 꺼내 쓰도록 합니다.
