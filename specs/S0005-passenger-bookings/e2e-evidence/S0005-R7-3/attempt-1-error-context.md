# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: S0005-passenger-bookings\US1-book-passenger.test.ts >> [US1] Book a passenger on a launch >> [R7] Reject a booking when the launch is failed
- Location: tests\S0005-passenger-bookings\US1-book-passenger.test.ts:214:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 409
```

# Page snapshot

```yaml
- generic [ref=f1e2]:
  - banner [ref=f1e3]:
    - navigation "Main menu" [ref=f1e4]:
      - strong [ref=f1e5]: testing-inteligente
      - list [ref=f1e6]:
        - listitem [ref=f1e7]:
          - link "Home" [ref=f1e8] [cursor=pointer]:
            - /url: /
        - listitem [ref=f1e9]:
          - link "About" [ref=f1e10] [cursor=pointer]:
            - /url: /about
        - listitem [ref=f1e11]:
          - link "Health" [ref=f1e12] [cursor=pointer]:
            - /url: /health
        - listitem [ref=f1e13]:
          - link "Rockets" [ref=f1e14] [cursor=pointer]:
            - /url: /rockets
        - listitem [ref=f1e15]:
          - link "Launches" [ref=f1e16] [cursor=pointer]:
            - /url: /launches
        - listitem [ref=f1e17]:
          - link "Existing User" [ref=f1e18] [cursor=pointer]:
            - /url: /users/82610498-7126-49a8-96ae-43c86d84083f
        - listitem [ref=f1e19]:
          - button "Logout" [ref=f1e20] [cursor=pointer]
      - button "Change theme" [ref=f1e21] [cursor=pointer]: Theme
    - status
  - main [ref=f1e22]:
    - heading "Launches" [level=1] [ref=f1e23]
    - status
    - list "Launches" [ref=f1e24]:
      - listitem [ref=f1e25]:
        - text: 5245-12-14 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e26]: confirmed
        - link "Passengers" [ref=f1e27] [cursor=pointer]:
          - /url: /launches/78ec4ae1-c53e-444e-a47b-5a463257d72e/bookings
        - group [ref=f1e29]:
          - button "Success" [ref=f1e30] [cursor=pointer]
          - button "Fail" [ref=f1e31] [cursor=pointer]
          - button "Suspend" [ref=f1e32] [cursor=pointer]
      - listitem [ref=f1e33]:
        - text: 5246-10-09 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e34]: planned
        - link "Passengers" [ref=f1e35] [cursor=pointer]:
          - /url: /launches/60a68fc4-802d-4e6d-a870-a52eb695c274/bookings
        - group [ref=f1e37]:
          - button "Confirm" [ref=f1e38] [cursor=pointer]
          - button "Suspend" [ref=f1e39] [cursor=pointer]
      - listitem [ref=f1e40]:
        - text: 5246-11-02 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e41]: planned
        - link "Passengers" [ref=f1e42] [cursor=pointer]:
          - /url: /launches/34ce5494-51d9-471b-a5e5-7a0c8aa12e5f/bookings
        - group [ref=f1e44]:
          - button "Confirm" [ref=f1e45] [cursor=pointer]
          - button "Suspend" [ref=f1e46] [cursor=pointer]
      - listitem [ref=f1e47]:
        - text: 5248-08-05 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e48]: planned
        - link "Passengers" [ref=f1e49] [cursor=pointer]:
          - /url: /launches/17085fa0-7ac2-49e6-823b-d77f2e6a114f/bookings
        - group [ref=f1e51]:
          - button "Confirm" [ref=f1e52] [cursor=pointer]
          - button "Suspend" [ref=f1e53] [cursor=pointer]
      - listitem [ref=f1e54]:
        - text: 5249-11-06 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e55]: planned
        - link "Passengers" [ref=f1e56] [cursor=pointer]:
          - /url: /launches/6017f023-5437-4e25-b21e-b63a4ef4ac88/bookings
        - group [ref=f1e58]:
          - button "Confirm" [ref=f1e59] [cursor=pointer]
          - button "Suspend" [ref=f1e60] [cursor=pointer]
      - listitem [ref=f1e61]:
        - text: 5251-06-18 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e62]: planned
        - link "Passengers" [ref=f1e63] [cursor=pointer]:
          - /url: /launches/d6fb427c-af7b-48bd-8a60-b9bf01a7d7f7/bookings
        - group [ref=f1e65]:
          - button "Confirm" [ref=f1e66] [cursor=pointer]
          - button "Suspend" [ref=f1e67] [cursor=pointer]
      - listitem [ref=f1e68]:
        - text: 5252-04-27 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e69]: planned
        - link "Passengers" [ref=f1e70] [cursor=pointer]:
          - /url: /launches/db560adb-010b-4a3f-8097-9a43f5b8106e/bookings
        - group [ref=f1e72]:
          - button "Confirm" [ref=f1e73] [cursor=pointer]
          - button "Suspend" [ref=f1e74] [cursor=pointer]
      - listitem [ref=f1e75]:
        - text: 5252-07-16 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e76]: planned
        - link "Passengers" [ref=f1e77] [cursor=pointer]:
          - /url: /launches/c6ec3929-d8ce-48f8-a4bc-805226d27d47/bookings
        - group [ref=f1e79]:
          - button "Confirm" [ref=f1e80] [cursor=pointer]
          - button "Suspend" [ref=f1e81] [cursor=pointer]
      - listitem [ref=f1e82]:
        - text: 5267-05-25 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e83]: planned
        - link "Passengers" [ref=f1e84] [cursor=pointer]:
          - /url: /launches/f2f34ca7-c030-4ff1-b486-c4a6a32e7b9e/bookings
        - group [ref=f1e86]:
          - button "Confirm" [ref=f1e87] [cursor=pointer]
          - button "Suspend" [ref=f1e88] [cursor=pointer]
      - listitem [ref=f1e89]:
        - text: 5268-04-29 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e90]: planned
        - link "Passengers" [ref=f1e91] [cursor=pointer]:
          - /url: /launches/7a3dccbe-921a-4b3c-adc7-85912027ed58/bookings
        - group [ref=f1e93]:
          - button "Confirm" [ref=f1e94] [cursor=pointer]
          - button "Suspend" [ref=f1e95] [cursor=pointer]
      - listitem [ref=f1e96]:
        - text: 5268-08-10 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e97]: planned
        - link "Passengers" [ref=f1e98] [cursor=pointer]:
          - /url: /launches/8d2206e1-c662-4453-aa4b-5a12d75f8014/bookings
        - group [ref=f1e100]:
          - button "Confirm" [ref=f1e101] [cursor=pointer]
          - button "Suspend" [ref=f1e102] [cursor=pointer]
      - listitem [ref=f1e103]:
        - text: 5268-11-08 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e104]: planned
        - link "Passengers" [ref=f1e105] [cursor=pointer]:
          - /url: /launches/230b7e24-83df-43d8-b3a3-e88dfeff1f5c/bookings
        - group [ref=f1e107]:
          - button "Confirm" [ref=f1e108] [cursor=pointer]
          - button "Suspend" [ref=f1e109] [cursor=pointer]
      - listitem [ref=f1e110]:
        - text: 5271-12-09 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e111]: planned
        - link "Passengers" [ref=f1e112] [cursor=pointer]:
          - /url: /launches/78c1f272-224c-4878-99a4-bf095900be1e/bookings
        - group [ref=f1e114]:
          - button "Confirm" [ref=f1e115] [cursor=pointer]
          - button "Suspend" [ref=f1e116] [cursor=pointer]
      - listitem [ref=f1e117]:
        - text: 5272-09-14 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e118]: planned
        - link "Passengers" [ref=f1e119] [cursor=pointer]:
          - /url: /launches/92a88699-1855-4123-924f-cad9952ef9b9/bookings
        - group [ref=f1e121]:
          - button "Confirm" [ref=f1e122] [cursor=pointer]
          - button "Suspend" [ref=f1e123] [cursor=pointer]
      - listitem [ref=f1e124]:
        - text: 5274-11-02 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e125]: planned
        - link "Passengers" [ref=f1e126] [cursor=pointer]:
          - /url: /launches/98e44e98-d6ea-4deb-b680-520600df750e/bookings
        - group [ref=f1e128]:
          - button "Confirm" [ref=f1e129] [cursor=pointer]
          - button "Suspend" [ref=f1e130] [cursor=pointer]
      - listitem [ref=f1e131]:
        - text: 5277-05-29 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e132]: planned
        - link "Passengers" [ref=f1e133] [cursor=pointer]:
          - /url: /launches/350add36-ad39-4fc1-866b-534817bae382/bookings
        - group [ref=f1e135]:
          - button "Confirm" [ref=f1e136] [cursor=pointer]
          - button "Suspend" [ref=f1e137] [cursor=pointer]
      - listitem [ref=f1e138]:
        - text: 5286-12-26 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e139]: planned
        - link "Passengers" [ref=f1e140] [cursor=pointer]:
          - /url: /launches/99d5cd19-3d0b-4fed-9e6e-744a7b177c2f/bookings
        - group [ref=f1e142]:
          - button "Confirm" [ref=f1e143] [cursor=pointer]
          - button "Suspend" [ref=f1e144] [cursor=pointer]
      - listitem [ref=f1e145]:
        - text: 5287-08-31 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e146]: planned
        - link "Passengers" [ref=f1e147] [cursor=pointer]:
          - /url: /launches/286648ef-1b42-4898-9193-0f9c2caf0d04/bookings
        - group [ref=f1e149]:
          - button "Confirm" [ref=f1e150] [cursor=pointer]
          - button "Suspend" [ref=f1e151] [cursor=pointer]
      - listitem [ref=f1e152]:
        - text: 5289-06-10 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e153]: planned
        - link "Passengers" [ref=f1e154] [cursor=pointer]:
          - /url: /launches/e5899d17-0b09-4728-ad30-cbed7528f973/bookings
        - group [ref=f1e156]:
          - button "Confirm" [ref=f1e157] [cursor=pointer]
          - button "Suspend" [ref=f1e158] [cursor=pointer]
      - listitem [ref=f1e159]:
        - text: 5292-06-20 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e160]: planned
        - link "Passengers" [ref=f1e161] [cursor=pointer]:
          - /url: /launches/a310a679-f5e4-492a-a668-77c6cf0012a2/bookings
        - group [ref=f1e163]:
          - button "Confirm" [ref=f1e164] [cursor=pointer]
          - button "Suspend" [ref=f1e165] [cursor=pointer]
      - listitem [ref=f1e166]:
        - text: 5294-01-06 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e167]: planned
        - link "Passengers" [ref=f1e168] [cursor=pointer]:
          - /url: /launches/a0b81a15-6018-412f-ab1a-902dd7f4eeef/bookings
        - group [ref=f1e170]:
          - button "Confirm" [ref=f1e171] [cursor=pointer]
          - button "Suspend" [ref=f1e172] [cursor=pointer]
      - listitem [ref=f1e173]:
        - text: 5294-08-25 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e174]: planned
        - link "Passengers" [ref=f1e175] [cursor=pointer]:
          - /url: /launches/5343590a-d470-4bb5-a7ec-75246456e252/bookings
        - group [ref=f1e177]:
          - button "Confirm" [ref=f1e178] [cursor=pointer]
          - button "Suspend" [ref=f1e179] [cursor=pointer]
      - listitem [ref=f1e180]:
        - text: 5296-12-28 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e181]: planned
        - link "Passengers" [ref=f1e182] [cursor=pointer]:
          - /url: /launches/403b5b42-e344-4e8d-8d63-cdcdde722fa4/bookings
        - group [ref=f1e184]:
          - button "Confirm" [ref=f1e185] [cursor=pointer]
          - button "Suspend" [ref=f1e186] [cursor=pointer]
      - listitem [ref=f1e187]:
        - text: 5302-02-15 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e188]: planned
        - link "Passengers" [ref=f1e189] [cursor=pointer]:
          - /url: /launches/b9e4b568-6325-4028-a296-66feaec7a27a/bookings
        - group [ref=f1e191]:
          - button "Confirm" [ref=f1e192] [cursor=pointer]
          - button "Suspend" [ref=f1e193] [cursor=pointer]
      - listitem [ref=f1e194]:
        - text: 5315-11-20 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e195]: planned
        - link "Passengers" [ref=f1e196] [cursor=pointer]:
          - /url: /launches/93e31fde-3037-4f7c-8020-09f90b85f73e/bookings
        - group [ref=f1e198]:
          - button "Confirm" [ref=f1e199] [cursor=pointer]
          - button "Suspend" [ref=f1e200] [cursor=pointer]
      - listitem [ref=f1e201]:
        - text: 5316-10-02 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e202]: planned
        - link "Passengers" [ref=f1e203] [cursor=pointer]:
          - /url: /launches/f01f948d-b623-4536-887f-4fb4ad07abb2/bookings
        - group [ref=f1e205]:
          - button "Confirm" [ref=f1e206] [cursor=pointer]
          - button "Suspend" [ref=f1e207] [cursor=pointer]
      - listitem [ref=f1e208]:
        - text: 5317-05-11 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e209]: planned
        - link "Passengers" [ref=f1e210] [cursor=pointer]:
          - /url: /launches/845046c6-8236-4c84-92da-6633070d93ee/bookings
        - group [ref=f1e212]:
          - button "Confirm" [ref=f1e213] [cursor=pointer]
          - button "Suspend" [ref=f1e214] [cursor=pointer]
      - listitem [ref=f1e215]:
        - text: 5319-02-02 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e216]: successful
        - link "Passengers" [ref=f1e217] [cursor=pointer]:
          - /url: /launches/7b60fed3-6dd9-413e-ae61-c0dc5775ae29/bookings
      - listitem [ref=f1e218]:
        - text: 5320-01-05 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e219]: planned
        - link "Passengers" [ref=f1e220] [cursor=pointer]:
          - /url: /launches/da185430-6a2d-4666-ae10-f4c56b11e66e/bookings
        - group [ref=f1e222]:
          - button "Confirm" [ref=f1e223] [cursor=pointer]
          - button "Suspend" [ref=f1e224] [cursor=pointer]
      - listitem [ref=f1e225]:
        - text: 5320-02-25 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e226]: planned
        - link "Passengers" [ref=f1e227] [cursor=pointer]:
          - /url: /launches/2b35ac1b-d79e-4d6d-9a6e-2131fda89fe7/bookings
        - group [ref=f1e229]:
          - button "Confirm" [ref=f1e230] [cursor=pointer]
          - button "Suspend" [ref=f1e231] [cursor=pointer]
      - listitem [ref=f1e232]:
        - text: 5325-12-26 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e233]: suspended
        - text: "weather: Strong wind"
        - link "Passengers" [ref=f1e234] [cursor=pointer]:
          - /url: /launches/c1e9bcf7-9dfd-4117-aa84-84c0e3269ad8/bookings
      - listitem [ref=f1e235]:
        - text: 5338-07-02 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e236]: planned
        - link "Passengers" [ref=f1e237] [cursor=pointer]:
          - /url: /launches/05459da1-f849-4777-bc6d-36a37be3547c/bookings
        - group [ref=f1e239]:
          - button "Confirm" [ref=f1e240] [cursor=pointer]
          - button "Suspend" [ref=f1e241] [cursor=pointer]
      - listitem [ref=f1e242]:
        - text: 5340-12-06 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e243]: planned
        - link "Passengers" [ref=f1e244] [cursor=pointer]:
          - /url: /launches/4034fae2-3b12-47d4-b673-866e943b9d68/bookings
        - group [ref=f1e246]:
          - button "Confirm" [ref=f1e247] [cursor=pointer]
          - button "Suspend" [ref=f1e248] [cursor=pointer]
      - listitem [ref=f1e249]:
        - text: 5341-08-06 · Booking Rocket 1793726209982-6-229958 · 100 per passenger ·
        - generic [ref=f1e250]: planned
        - link "Passengers" [ref=f1e251] [cursor=pointer]:
          - /url: /launches/51bca282-e54e-4b94-ae4e-8ec84308d54d/bookings
        - group [ref=f1e253]:
          - button "Confirm" [ref=f1e254] [cursor=pointer]
          - button "Suspend" [ref=f1e255] [cursor=pointer]
      - listitem [ref=f1e256]:
        - text: 5343-06-08 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e257]: planned
        - link "Passengers" [ref=f1e258] [cursor=pointer]:
          - /url: /launches/4eaf624d-00e0-4c36-8e81-ed1e0ea79140/bookings
        - group [ref=f1e260]:
          - button "Confirm" [ref=f1e261] [cursor=pointer]
          - button "Suspend" [ref=f1e262] [cursor=pointer]
      - listitem [ref=f1e263]:
        - text: 5785-10-29 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e264]: planned
        - link "Passengers" [ref=f1e265] [cursor=pointer]:
          - /url: /launches/8d59ae5b-6a7d-4a59-a03d-be79dd366c22/bookings
        - group [ref=f1e267]:
          - button "Confirm" [ref=f1e268] [cursor=pointer]
          - button "Suspend" [ref=f1e269] [cursor=pointer]
      - listitem [ref=f1e270]:
        - text: 5813-03-06 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e271]: planned
        - link "Passengers" [ref=f1e272] [cursor=pointer]:
          - /url: /launches/e93225dc-fc04-4214-bf3c-4d529cc0efe3/bookings
        - group [ref=f1e274]:
          - button "Confirm" [ref=f1e275] [cursor=pointer]
          - button "Suspend" [ref=f1e276] [cursor=pointer]
      - listitem [ref=f1e277]:
        - text: 5816-09-01 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e278]: planned
        - link "Passengers" [ref=f1e279] [cursor=pointer]:
          - /url: /launches/7c3aa641-90fe-4129-9e0c-b14d66fda284/bookings
        - group [ref=f1e281]:
          - button "Confirm" [ref=f1e282] [cursor=pointer]
          - button "Suspend" [ref=f1e283] [cursor=pointer]
      - listitem [ref=f1e284]:
        - text: 5826-01-19 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e285]: planned
        - link "Passengers" [ref=f1e286] [cursor=pointer]:
          - /url: /launches/9f6765d8-47f1-422c-8afc-905feddffa77/bookings
        - group [ref=f1e288]:
          - button "Confirm" [ref=f1e289] [cursor=pointer]
          - button "Suspend" [ref=f1e290] [cursor=pointer]
      - listitem [ref=f1e291]:
        - text: 5828-10-11 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e292]: successful
        - link "Passengers" [ref=f1e293] [cursor=pointer]:
          - /url: /launches/7a36886d-cc84-4da6-b245-2d22badf42c3/bookings
      - listitem [ref=f1e294]:
        - text: 5832-01-27 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e295]: confirmed
        - link "Passengers" [ref=f1e296] [cursor=pointer]:
          - /url: /launches/a2c65e62-b88d-40eb-8ea1-068da749dea9/bookings
        - group [ref=f1e298]:
          - button "Success" [ref=f1e299] [cursor=pointer]
          - button "Fail" [ref=f1e300] [cursor=pointer]
          - button "Suspend" [ref=f1e301] [cursor=pointer]
      - listitem [ref=f1e302]:
        - text: 5833-05-26 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e303]: failed
        - link "Passengers" [ref=f1e304] [cursor=pointer]:
          - /url: /launches/35c53fdb-fe6e-482a-b988-6e0569815c28/bookings
      - listitem [ref=f1e305]:
        - text: 5839-01-23 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e306]: planned
        - link "Passengers" [ref=f1e307] [cursor=pointer]:
          - /url: /launches/b397c08c-ad36-436a-b1ec-1dc7ed6175d8/bookings
        - group [ref=f1e309]:
          - button "Confirm" [ref=f1e310] [cursor=pointer]
          - button "Suspend" [ref=f1e311] [cursor=pointer]
      - listitem [ref=f1e312]:
        - text: 5842-04-29 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e313]: planned
        - link "Passengers" [ref=f1e314] [cursor=pointer]:
          - /url: /launches/864ca98c-26c0-4364-bef4-d29f11c2eea0/bookings
        - group [ref=f1e316]:
          - button "Confirm" [ref=f1e317] [cursor=pointer]
          - button "Suspend" [ref=f1e318] [cursor=pointer]
      - listitem [ref=f1e319]:
        - text: 5861-08-20 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e320]: failed
        - link "Passengers" [ref=f1e321] [cursor=pointer]:
          - /url: /launches/f54f8df0-8dd3-4e81-bcc6-323d66c473bd/bookings
      - listitem [ref=f1e322]:
        - text: 5861-10-13 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e323]: suspended
        - text: "weather: Strong wind"
        - link "Passengers" [ref=f1e324] [cursor=pointer]:
          - /url: /launches/4d7da86a-a2f9-4046-8812-c8498e80ffde/bookings
      - listitem [ref=f1e325]:
        - text: 5862-07-22 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e326]: successful
        - link "Passengers" [ref=f1e327] [cursor=pointer]:
          - /url: /launches/31fb3fcd-8d6e-41ea-8e58-b0ee12494009/bookings
      - listitem [ref=f1e328]:
        - text: 5863-07-03 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e329]: planned
        - link "Passengers" [ref=f1e330] [cursor=pointer]:
          - /url: /launches/52cd263d-ca4f-4e89-9d2b-f76dd983c7f9/bookings
        - group [ref=f1e332]:
          - button "Confirm" [ref=f1e333] [cursor=pointer]
          - button "Suspend" [ref=f1e334] [cursor=pointer]
      - listitem [ref=f1e335]:
        - text: 5864-12-24 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e336]: planned
        - link "Passengers" [ref=f1e337] [cursor=pointer]:
          - /url: /launches/a6c7d431-1bbc-4786-b1d6-77456be199ac/bookings
        - group [ref=f1e339]:
          - button "Confirm" [ref=f1e340] [cursor=pointer]
          - button "Suspend" [ref=f1e341] [cursor=pointer]
      - listitem [ref=f1e342]:
        - text: 5865-09-26 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e343]: planned
        - link "Passengers" [ref=f1e344] [cursor=pointer]:
          - /url: /launches/c4d8f93c-3855-4186-80f4-e1f568700eff/bookings
        - group [ref=f1e346]:
          - button "Confirm" [ref=f1e347] [cursor=pointer]
          - button "Suspend" [ref=f1e348] [cursor=pointer]
      - listitem [ref=f1e349]:
        - text: 5885-11-13 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e350]: planned
        - link "Passengers" [ref=f1e351] [cursor=pointer]:
          - /url: /launches/a1f48a52-a990-462f-8708-31ac6d6b0214/bookings
        - group [ref=f1e353]:
          - button "Confirm" [ref=f1e354] [cursor=pointer]
          - button "Suspend" [ref=f1e355] [cursor=pointer]
      - listitem [ref=f1e356]:
        - text: 5890-03-06 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e357]: planned
        - link "Passengers" [ref=f1e358] [cursor=pointer]:
          - /url: /launches/660b1b59-31b9-4333-b66a-6f0e7f1bf766/bookings
        - group [ref=f1e360]:
          - button "Confirm" [ref=f1e361] [cursor=pointer]
          - button "Suspend" [ref=f1e362] [cursor=pointer]
      - listitem [ref=f1e363]:
        - text: 5892-03-24 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e364]: successful
        - link "Passengers" [ref=f1e365] [cursor=pointer]:
          - /url: /launches/668fd9a3-7abb-47ba-90ec-0b49fbc8f23d/bookings
      - listitem [ref=f1e366]:
        - text: 5894-10-09 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e367]: suspended
        - text: "technical: Engine leak"
        - link "Passengers" [ref=f1e368] [cursor=pointer]:
          - /url: /launches/8889e0ef-f6a3-4df6-9f5b-aa4bc0f804f5/bookings
      - listitem [ref=f1e369]:
        - text: 5902-01-29 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e370]: confirmed
        - link "Passengers" [ref=f1e371] [cursor=pointer]:
          - /url: /launches/18d5e0d7-20ce-49c4-b2e7-5914af3708c3/bookings
        - group [ref=f1e373]:
          - button "Success" [ref=f1e374] [cursor=pointer]
          - button "Fail" [ref=f1e375] [cursor=pointer]
          - button "Suspend" [ref=f1e376] [cursor=pointer]
      - listitem [ref=f1e377]:
        - text: 5905-04-25 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e378]: planned
        - link "Passengers" [ref=f1e379] [cursor=pointer]:
          - /url: /launches/78a30c7c-7a4c-43db-9a8a-5a29acb19115/bookings
        - group [ref=f1e381]:
          - button "Confirm" [ref=f1e382] [cursor=pointer]
          - button "Suspend" [ref=f1e383] [cursor=pointer]
      - listitem [ref=f1e384]:
        - text: 5911-12-01 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e385]: planned
        - link "Passengers" [ref=f1e386] [cursor=pointer]:
          - /url: /launches/8eee096f-baef-4d68-aab5-a824f23bd866/bookings
        - group [ref=f1e388]:
          - button "Confirm" [ref=f1e389] [cursor=pointer]
          - button "Suspend" [ref=f1e390] [cursor=pointer]
      - listitem [ref=f1e391]:
        - text: 5928-11-10 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e392]: planned
        - link "Passengers" [ref=f1e393] [cursor=pointer]:
          - /url: /launches/2d0a3992-98e5-4582-8845-f366afa7f963/bookings
        - group [ref=f1e395]:
          - button "Confirm" [ref=f1e396] [cursor=pointer]
          - button "Suspend" [ref=f1e397] [cursor=pointer]
      - listitem [ref=f1e398]:
        - text: 5930-01-15 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e399]: planned
        - link "Passengers" [ref=f1e400] [cursor=pointer]:
          - /url: /launches/9b150af2-c95a-446a-a0a2-c1f41df28029/bookings
        - group [ref=f1e402]:
          - button "Confirm" [ref=f1e403] [cursor=pointer]
          - button "Suspend" [ref=f1e404] [cursor=pointer]
      - listitem [ref=f1e405]:
        - text: 5931-06-11 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e406]: planned
        - link "Passengers" [ref=f1e407] [cursor=pointer]:
          - /url: /launches/d037bc68-61f3-471a-b38d-cee1baa9d071/bookings
        - group [ref=f1e409]:
          - button "Confirm" [ref=f1e410] [cursor=pointer]
          - button "Suspend" [ref=f1e411] [cursor=pointer]
      - listitem [ref=f1e412]:
        - text: 5931-06-18 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e413]: planned
        - link "Passengers" [ref=f1e414] [cursor=pointer]:
          - /url: /launches/d032f556-6d5e-4b0d-a021-47358e4dc18c/bookings
        - group [ref=f1e416]:
          - button "Confirm" [ref=f1e417] [cursor=pointer]
          - button "Suspend" [ref=f1e418] [cursor=pointer]
      - listitem [ref=f1e419]:
        - text: 5940-09-20 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e420]: planned
        - link "Passengers" [ref=f1e421] [cursor=pointer]:
          - /url: /launches/0fa4bcf8-03c6-4439-9c72-649614e05fd9/bookings
        - group [ref=f1e423]:
          - button "Confirm" [ref=f1e424] [cursor=pointer]
          - button "Suspend" [ref=f1e425] [cursor=pointer]
      - listitem [ref=f1e426]:
        - text: 5946-01-30 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e427]: planned
        - link "Passengers" [ref=f1e428] [cursor=pointer]:
          - /url: /launches/18e7fbf3-a1fb-4dbf-9a06-66d2eea37b11/bookings
        - group [ref=f1e430]:
          - button "Confirm" [ref=f1e431] [cursor=pointer]
          - button "Suspend" [ref=f1e432] [cursor=pointer]
      - listitem [ref=f1e433]:
        - text: 5949-06-22 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e434]: planned
        - link "Passengers" [ref=f1e435] [cursor=pointer]:
          - /url: /launches/dff1c86d-c57a-4dbb-b83f-ff08484a9e30/bookings
        - group [ref=f1e437]:
          - button "Confirm" [ref=f1e438] [cursor=pointer]
          - button "Suspend" [ref=f1e439] [cursor=pointer]
      - listitem [ref=f1e440]:
        - text: 5956-05-22 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e441]: planned
        - link "Passengers" [ref=f1e442] [cursor=pointer]:
          - /url: /launches/25ee149a-7e68-4655-8345-f22b69b70f5a/bookings
        - group [ref=f1e444]:
          - button "Confirm" [ref=f1e445] [cursor=pointer]
          - button "Suspend" [ref=f1e446] [cursor=pointer]
      - listitem [ref=f1e447]:
        - text: 5970-06-19 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e448]: planned
        - link "Passengers" [ref=f1e449] [cursor=pointer]:
          - /url: /launches/771c4f84-8ad9-447d-952b-24c86ecd984b/bookings
        - group [ref=f1e451]:
          - button "Confirm" [ref=f1e452] [cursor=pointer]
          - button "Suspend" [ref=f1e453] [cursor=pointer]
      - listitem [ref=f1e454]:
        - text: 5973-03-26 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e455]: planned
        - link "Passengers" [ref=f1e456] [cursor=pointer]:
          - /url: /launches/9ec442ad-dc1c-488e-a802-60e5af927f56/bookings
        - group [ref=f1e458]:
          - button "Confirm" [ref=f1e459] [cursor=pointer]
          - button "Suspend" [ref=f1e460] [cursor=pointer]
      - listitem [ref=f1e461]:
        - text: 5974-01-19 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e462]: planned
        - link "Passengers" [ref=f1e463] [cursor=pointer]:
          - /url: /launches/9bc3265f-b9a1-4a96-bb0f-f841c21f05cb/bookings
        - group [ref=f1e465]:
          - button "Confirm" [ref=f1e466] [cursor=pointer]
          - button "Suspend" [ref=f1e467] [cursor=pointer]
      - listitem [ref=f1e468]:
        - text: 5977-01-10 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e469]: planned
        - link "Passengers" [ref=f1e470] [cursor=pointer]:
          - /url: /launches/a939cd4f-6abe-41ca-be8d-3f6c4b600e00/bookings
        - group [ref=f1e472]:
          - button "Confirm" [ref=f1e473] [cursor=pointer]
          - button "Suspend" [ref=f1e474] [cursor=pointer]
      - listitem [ref=f1e475]:
        - text: 5984-11-11 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e476]: planned
        - link "Passengers" [ref=f1e477] [cursor=pointer]:
          - /url: /launches/143ec802-5c2f-45c8-bf6c-d5d40d0166c3/bookings
        - group [ref=f1e479]:
          - button "Confirm" [ref=f1e480] [cursor=pointer]
          - button "Suspend" [ref=f1e481] [cursor=pointer]
      - listitem [ref=f1e482]:
        - text: 5987-08-22 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e483]: planned
        - link "Passengers" [ref=f1e484] [cursor=pointer]:
          - /url: /launches/617c293d-f3c2-4e67-b98c-0e6f1166973c/bookings
        - group [ref=f1e486]:
          - button "Confirm" [ref=f1e487] [cursor=pointer]
          - button "Suspend" [ref=f1e488] [cursor=pointer]
      - listitem [ref=f1e489]:
        - text: 5997-03-30 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e490]: planned
        - link "Passengers" [ref=f1e491] [cursor=pointer]:
          - /url: /launches/49d998d2-2e5c-4bbd-97b6-4f1670da5d55/bookings
        - group [ref=f1e493]:
          - button "Confirm" [ref=f1e494] [cursor=pointer]
          - button "Suspend" [ref=f1e495] [cursor=pointer]
      - listitem [ref=f1e496]:
        - text: 6005-01-10 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e497]: planned
        - link "Passengers" [ref=f1e498] [cursor=pointer]:
          - /url: /launches/4e794cc2-d232-4aee-82a6-876111f0a503/bookings
        - group [ref=f1e500]:
          - button "Confirm" [ref=f1e501] [cursor=pointer]
          - button "Suspend" [ref=f1e502] [cursor=pointer]
      - listitem [ref=f1e503]:
        - text: 6011-10-26 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e504]: planned
        - link "Passengers" [ref=f1e505] [cursor=pointer]:
          - /url: /launches/2d620d09-d26d-4078-9ab7-1abf75416eb6/bookings
        - group [ref=f1e507]:
          - button "Confirm" [ref=f1e508] [cursor=pointer]
          - button "Suspend" [ref=f1e509] [cursor=pointer]
      - listitem [ref=f1e510]:
        - text: 6012-01-29 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e511]: planned
        - link "Passengers" [ref=f1e512] [cursor=pointer]:
          - /url: /launches/a568252a-a1b1-45dd-ab52-586714c54aa6/bookings
        - group [ref=f1e514]:
          - button "Confirm" [ref=f1e515] [cursor=pointer]
          - button "Suspend" [ref=f1e516] [cursor=pointer]
      - listitem [ref=f1e517]:
        - text: 6014-09-08 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e518]: planned
        - link "Passengers" [ref=f1e519] [cursor=pointer]:
          - /url: /launches/6e2935af-d2a4-4624-a9e8-5961f4372168/bookings
        - group [ref=f1e521]:
          - button "Confirm" [ref=f1e522] [cursor=pointer]
          - button "Suspend" [ref=f1e523] [cursor=pointer]
      - listitem [ref=f1e524]:
        - text: 6017-08-20 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e525]: planned
        - link "Passengers" [ref=f1e526] [cursor=pointer]:
          - /url: /launches/b9c00cb0-afaf-4c41-9855-5288f62e728e/bookings
        - group [ref=f1e528]:
          - button "Confirm" [ref=f1e529] [cursor=pointer]
          - button "Suspend" [ref=f1e530] [cursor=pointer]
      - listitem [ref=f1e531]:
        - text: 6020-03-31 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e532]: planned
        - link "Passengers" [ref=f1e533] [cursor=pointer]:
          - /url: /launches/1cb93fae-218f-45d1-b5d5-08115dc85dbc/bookings
        - group [ref=f1e535]:
          - button "Confirm" [ref=f1e536] [cursor=pointer]
          - button "Suspend" [ref=f1e537] [cursor=pointer]
      - listitem [ref=f1e538]:
        - text: 6022-12-14 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e539]: planned
        - link "Passengers" [ref=f1e540] [cursor=pointer]:
          - /url: /launches/6f6a5bca-efe9-4707-94be-cffc8fb1cd7e/bookings
        - group [ref=f1e542]:
          - button "Confirm" [ref=f1e543] [cursor=pointer]
          - button "Suspend" [ref=f1e544] [cursor=pointer]
      - listitem [ref=f1e545]:
        - text: 6036-01-13 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e546]: planned
        - link "Passengers" [ref=f1e547] [cursor=pointer]:
          - /url: /launches/832bb8a1-8b9e-4d61-9d40-bfb1c491dd88/bookings
        - group [ref=f1e549]:
          - button "Confirm" [ref=f1e550] [cursor=pointer]
          - button "Suspend" [ref=f1e551] [cursor=pointer]
      - listitem [ref=f1e552]:
        - text: 6044-10-24 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e553]: planned
        - link "Passengers" [ref=f1e554] [cursor=pointer]:
          - /url: /launches/40d3af3c-5e46-4370-b90a-9707084aa77a/bookings
        - group [ref=f1e556]:
          - button "Confirm" [ref=f1e557] [cursor=pointer]
          - button "Suspend" [ref=f1e558] [cursor=pointer]
      - listitem [ref=f1e559]:
        - text: 6046-01-12 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e560]: planned
        - link "Passengers" [ref=f1e561] [cursor=pointer]:
          - /url: /launches/6ee2bd19-696c-4cb0-a966-d07e7425d81c/bookings
        - group [ref=f1e563]:
          - button "Confirm" [ref=f1e564] [cursor=pointer]
          - button "Suspend" [ref=f1e565] [cursor=pointer]
      - listitem [ref=f1e566]:
        - text: 6046-11-22 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e567]: planned
        - link "Passengers" [ref=f1e568] [cursor=pointer]:
          - /url: /launches/8e696956-d744-48c6-9775-873396481ba1/bookings
        - group [ref=f1e570]:
          - button "Confirm" [ref=f1e571] [cursor=pointer]
          - button "Suspend" [ref=f1e572] [cursor=pointer]
      - listitem [ref=f1e573]:
        - text: 6049-10-05 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e574]: successful
        - link "Passengers" [ref=f1e575] [cursor=pointer]:
          - /url: /launches/30518b37-bf64-4cde-a1e6-be4f69c74668/bookings
      - listitem [ref=f1e576]:
        - text: 6053-07-12 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e577]: suspended
        - text: "weather: Strong wind"
        - link "Passengers" [ref=f1e578] [cursor=pointer]:
          - /url: /launches/3a988a69-9dda-477e-b25b-218e8d5c1bc5/bookings
      - listitem [ref=f1e579]:
        - text: 6057-02-27 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e580]: planned
        - link "Passengers" [ref=f1e581] [cursor=pointer]:
          - /url: /launches/1070ba49-23b3-4c28-9e49-71a66525211c/bookings
        - group [ref=f1e583]:
          - button "Confirm" [ref=f1e584] [cursor=pointer]
          - button "Suspend" [ref=f1e585] [cursor=pointer]
    - status
    - generic [ref=f1e586]:
      - heading "Schedule a launch" [level=2] [ref=f1e587]
      - status [ref=f1e588]: Launch scheduled
      - generic [ref=f1e589]:
        - generic [ref=f1e590]:
          - text: Rocket
          - combobox "Rocket" [ref=f1e591]:
            - option "Booking Rocket 1793726209982-6-229958" [selected]
            - option "Falcon 1793726370888542"
            - option "Falcon 1793726372433200"
            - option "Falcon 1793726372632624"
            - option "Falcon 1793726372722695"
            - option "Falcon 1793726373203276"
            - option "Falcon 1793726373245674"
            - option "Falcon 1793726373510238"
            - option "Falcon 1793726374021422"
            - option "Seed Rocket"
            - option "Vega 1793726372632122"
            - option "Vega 1793726372722374"
            - option "Vega 1793726373203832"
          - status
        - generic [ref=f1e592]:
          - text: Date
          - textbox "Date" [ref=f1e593]
          - status
        - generic [ref=f1e594]:
          - text: Price per passenger
          - spinbutton "Price per passenger" [ref=f1e595]
          - status
        - button "Schedule launch" [active] [ref=f1e596] [cursor=pointer]
```

# Test source

```ts
  1   | import { expect, test } from "@playwright/test";
  2   | import { getBookings, sendBooking } from "../../core/bookings";
  3   | import { sendStatus } from "../../core/launches";
  4   | import { logIn, logInPage } from "../../core/rockets";
  5   | import { LaunchesPage } from "../../pages/launches.page";
  6   | import { createPassenger, invalidPassengerInputs } from "../../test-data/bookings";
  7   | import { createLaunchData } from "../../test-data/launches";
  8   | 
  9   | type LaunchResult = { id: string };
  10  | 
  11  | async function scheduleLaunch(page: import("@playwright/test").Page): Promise<string> {
  12  |   const launches = new LaunchesPage(page);
  13  |   const response = await launches.scheduleLaunch(createLaunchData());
  14  |   expect(response.status()).toBe(201);
  15  |   return ((await response.json()) as LaunchResult).id;
  16  | }
  17  | 
  18  | async function changeStatus(
  19  |   request: import("@playwright/test").APIRequestContext,
  20  |   id: string,
  21  |   status: string,
  22  |   token: string,
  23  | ): Promise<void> {
> 24  |   expect((await sendStatus(request, id, { status }, token)).status()).toBe(200);
      |                                                                       ^ Error: expect(received).toBe(expected) // Object.is equality
  25  | }
  26  | 
  27  | test.describe("[US1] Book a passenger on a launch", { tag: ["@S0005", "@S0005-US1"] }, () => {
  28  |   for (const status of ["planned", "confirmed"]) {
  29  |     test(
  30  |       `[R1] Book a passenger when the launch is ${status}`,
  31  |       { tag: "@S0005-R1" },
  32  |       async ({ page, request }) => {
  33  |         const token = await logIn(request);
  34  |         await logInPage(page);
  35  |         const launchId = await scheduleLaunch(page);
  36  |         if (status === "confirmed") await changeStatus(request, launchId, status, token);
  37  |         const passenger = createPassenger();
  38  | 
  39  |         const response = await sendBooking(request, launchId, passenger, token);
  40  |         expect(response.status()).toBe(201);
  41  |         const saved = (await getBookings(request, launchId, token)).json() as Promise<{
  42  |           bookings: Array<Record<keyof typeof passenger, string>>;
  43  |         }>;
  44  |         const bookings = (await saved).bookings;
  45  |         expect(bookings).toHaveLength(1);
  46  |         expect(bookings[0]).toMatchObject(passenger);
  47  |       },
  48  |     );
  49  |   }
  50  | 
  51  |   for (const tokenCase of ["no token", "an invalid token"]) {
  52  |     test(
  53  |       `[R2] Reject a booking with ${tokenCase}`,
  54  |       { tag: "@S0005-R2" },
  55  |       async ({ page, request }) => {
  56  |         const token = await logIn(request);
  57  |         await logInPage(page);
  58  |         const launchId = await scheduleLaunch(page);
  59  |         const passenger = createPassenger();
  60  |         const response = await sendBooking(
  61  |           request,
  62  |           launchId,
  63  |           passenger,
  64  |           tokenCase === "no token" ? undefined : "invalid-token",
  65  |         );
  66  | 
  67  |         expect(response.status()).toBe(401);
  68  |         const state = await (await getBookings(request, launchId, token)).json();
  69  |         expect(state.bookings).toEqual([]);
  70  |       },
  71  |     );
  72  |   }
  73  | 
  74  |   for (const { field, input } of invalidPassengerInputs) {
  75  |     test(`[R3] Reject ${input} for ${field}`, { tag: "@S0005-R3" }, async ({ page, request }) => {
  76  |       const token = await logIn(request);
  77  |       await logInPage(page);
  78  |       const launchId = await scheduleLaunch(page);
  79  |       const passenger: Record<string, unknown> = { ...createPassenger() };
  80  |       if (input === "missing") delete passenger[field];
  81  |       if (input === "empty") passenger[field] = "";
  82  |       if (input === "spaces") passenger[field] = "   ";
  83  |       if (input === "number") passenger[field] = 123;
  84  |       if (input === "invalid-email") passenger[field] = "invalid-email";
  85  | 
  86  |       const response = await sendBooking(request, launchId, passenger, token);
  87  |       expect(response.status()).toBe(400);
  88  |       const body = (await response.json()) as { error: string; fields: Record<string, string> };
  89  |       expect(body.error).toBeTruthy();
  90  |       expect(body.fields).toHaveProperty(field);
  91  |       expect((await (await getBookings(request, launchId, token)).json()).bookings).toHaveLength(0);
  92  |     });
  93  |   }
  94  | 
  95  |   test(
  96  |     "[R4] Reject a booking for a launch that does not exist",
  97  |     { tag: "@S0005-R4" },
  98  |     async ({ request }) => {
  99  |       const token = await logIn(request);
  100 |       const response = await sendBooking(
  101 |         request,
  102 |         `missing-${Date.now()}`,
  103 |         createPassenger(),
  104 |         token,
  105 |       );
  106 |       expect(response.status()).toBe(404);
  107 |     },
  108 |   );
  109 | 
  110 |   test(
  111 |     "[R5] Reject a duplicate document and its whitespace variant",
  112 |     { tag: "@S0005-R5" },
  113 |     async ({ page, request }) => {
  114 |       const token = await logIn(request);
  115 |       await logInPage(page);
  116 |       const launchId = await scheduleLaunch(page);
  117 |       const passenger = createPassenger();
  118 |       expect((await sendBooking(request, launchId, passenger, token)).status()).toBe(201);
  119 |       for (const identityDocument of [
  120 |         passenger.identityDocument,
  121 |         `  ${passenger.identityDocument}  `,
  122 |       ]) {
  123 |         const duplicate = { ...createPassenger(), identityDocument };
  124 |         expect((await sendBooking(request, launchId, duplicate, token)).status()).toBe(409);
```