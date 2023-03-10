# IAMGROUND - 클라우드 권한 관리 플랫폼
![image](https://user-images.githubusercontent.com/66164561/224383113-7e5d04e3-5d5e-46b3-b580-2d38b25b4321.png)

#### 최소 권한 원칙과 기본 보안 수칙을 기반으로 안전한 IAM 운영 및 관리를 돕는 플랫폼
<br>

✔️ 타겟: AWS 클라우드 도입을 시작한 스타트업과 중소기업의 보안 담당자 
* 불필요하거나 과도한 권한 부여를 막아 보안사고 발생 시 피해 축소
* 올바른 구성(MFA, root 계정 비활성화 등) 가이드라인을 제공하여 보안 사고 예방
* 이상행위 탐지를 통한 보안 사고 대응
* AWS Well-Architected 프레임워크, AWS Best Practice, CIS BenchMark, 실무자 인터뷰 등을 기반으로 수립된 보안 권고 사항 추천
<br>

## 플랫폼 주요 기능
#### DashBoard
![image](https://user-images.githubusercontent.com/66164561/224378796-ea571840-dec4-4d87-aba8-f23014dc48a5.png)
* 스캐닝 정보 요약
   * 위험한 리소스의 비율을 표시함으로써 클라우드의 현재 상태를 파악하는데 도움
* 이상 행위 감지
   * 시간대별로 발생한 이벤트의 횟수를 나타낸 그래프
   * 확인하지 않은 위험 로그의 개수/위험 로그가 발생한 유저의 수
* 연결된 클라우드 목록과 각각의 연결 상태
<br>

#### Scanning
![image](https://user-images.githubusercontent.com/66164561/224379339-cb04a97e-d7f5-4f60-91e9-69c8caed844f.png)
* 클라우드별 권고 사항의 개수 변화를 나타낸 그래프
   * 클라우드 위험도 변화 추이 확인 및 클라우드 간의 비교
* 클라우드별 스캔 버튼/결과 보고서 보기 버튼

![image](https://user-images.githubusercontent.com/66164561/224379718-32e67e54-5b15-4854-9299-ac0ba9e72fc3.png)
* 결과 보고서 - 요약
   * 보고서 정보를 시각적으로 요약
   * 계정의 전반적인 상태 파악
   * 이전 스캔 보고서와의 비교를 통해 관리 정도를 확인
   
![image](https://user-images.githubusercontent.com/66164561/224379958-71359279-88c3-4257-a5fe-21a27deb414f.png)
![image](https://user-images.githubusercontent.com/66164561/224379968-84f20025-2efc-42ca-95ca-fd8c22a6c13e.png)
* 결과 보고서 - 권한 분리 추천
   * 자세한 조치 방법 확인 가능

![image](https://user-images.githubusercontent.com/66164561/224380225-0bdba708-3e06-427e-bc32-888833b5d454.png)
![image](https://user-images.githubusercontent.com/66164561/224380206-2bb124fe-06f2-4445-ab2c-4fc9a5029e8b.png)
* 결과 보고서 - 올바른 구성 추천
<br>

#### Monitoring
![image](https://user-images.githubusercontent.com/66164561/224380697-7976ecc2-f916-4726-95bd-12f3f4b42442.png)
![image](https://user-images.githubusercontent.com/66164561/224380909-5c7ef360-234b-4629-a504-e95df62adc3e.png)
* IAM 서비스 사용 로그 모니터링
   * 위험한 로그로 판단되는 경우 분홍색으로 표시


![image](https://user-images.githubusercontent.com/66164561/224381006-497f6704-8c92-4214-981a-ca859d61baa7.png)
* 유저 로그 
   * IAM 유저별로 확인하지 않은 위험 로그 개수 표시
   * 위험한 유저로 판단되는 유저들은 상단에 배치
   * 원하는 기준대로 유저들을 묶어 그룹으로 관리 가능
   * 원하는 유저나 그룹의 로그 확인 가능
<br>

#### Visualization
![image](https://user-images.githubusercontent.com/66164561/224381521-5d14da12-d666-40ca-a498-caa6e6abc36e.png)
* 클라우드별로 IAM 리소스 관계를 시각화
   * AWS 그룹, 권한 분리 그룹, 스캐닝 결과 선택 가능

![image](https://user-images.githubusercontent.com/66164561/224381687-809ddbae-a266-4e66-9c49-24e1c7ec4422.png)
![image](https://user-images.githubusercontent.com/66164561/224381704-34bce853-4da0-42eb-b85b-3d724d0e99de.png)
* 리소스 세부 정보
   * 해당 리소스의 정보
   * 연결된 IAM 리소스를 나타낸 그래프
      * 위험 요소가 없는 연결은 검은색
      * 위험 요소가 있으나 사용자가 마킹한 연결은 파란색
      * 위험 요소가 있는 연결은 빨간색
      * 연결 선을 클릭하여 해당 리소스에 대한 권고 사항 설명 페이지로 이동한 후 즉각적인 조치를 취할 수 있음
<br>

#### Notification
![image](https://user-images.githubusercontent.com/66164561/224382187-65808640-6ec0-4056-9ff8-911e1489fab3.png)
* 사용자가 설정한 업무 시간과 리소스 만료일에 따라 우측 하단에 토스트 알림
<br>





