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
            - /url: /users/1275fdfd-531c-4d79-9c8e-8ac4b81fbaed
        - listitem [ref=f1e19]:
          - button "Logout" [ref=f1e20] [cursor=pointer]
      - button "Change theme" [ref=f1e21] [cursor=pointer]: Theme
    - status
  - main [ref=f1e22]:
    - heading "Launches" [level=1] [ref=f1e23]
    - status
    - list "Launches" [ref=f1e24]:
      - listitem [ref=f1e25]:
        - text: 7995-03-13 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e26]: planned
        - link "Passengers" [ref=f1e27] [cursor=pointer]:
          - /url: /launches/daa8db00-4200-4549-bd65-4590e3f89f87/bookings
        - group [ref=f1e29]:
          - button "Confirm" [ref=f1e30] [cursor=pointer]
          - button "Suspend" [ref=f1e31] [cursor=pointer]
      - listitem [ref=f1e32]:
        - text: 7996-03-03 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e33]: confirmed
        - link "Passengers" [ref=f1e34] [cursor=pointer]:
          - /url: /launches/053523ea-e49a-44bf-8346-11de7f750ebb/bookings
        - group [ref=f1e36]:
          - button "Success" [ref=f1e37] [cursor=pointer]
          - button "Fail" [ref=f1e38] [cursor=pointer]
          - button "Suspend" [ref=f1e39] [cursor=pointer]
      - listitem [ref=f1e40]:
        - text: 7998-06-17 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e41]: planned
        - link "Passengers" [ref=f1e42] [cursor=pointer]:
          - /url: /launches/41648868-a920-4536-9a7b-6f604f11d253/bookings
        - group [ref=f1e44]:
          - button "Confirm" [ref=f1e45] [cursor=pointer]
          - button "Suspend" [ref=f1e46] [cursor=pointer]
      - listitem [ref=f1e47]:
        - text: 7998-07-21 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e48]: planned
        - link "Passengers" [ref=f1e49] [cursor=pointer]:
          - /url: /launches/c58d1ea0-0fa5-4d58-886c-0cdac10a061d/bookings
        - group [ref=f1e51]:
          - button "Confirm" [ref=f1e52] [cursor=pointer]
          - button "Suspend" [ref=f1e53] [cursor=pointer]
      - listitem [ref=f1e54]:
        - text: 8003-05-24 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e55]: planned
        - link "Passengers" [ref=f1e56] [cursor=pointer]:
          - /url: /launches/72ddafaf-0707-4274-8b53-0ff75c7d8f32/bookings
        - group [ref=f1e58]:
          - button "Confirm" [ref=f1e59] [cursor=pointer]
          - button "Suspend" [ref=f1e60] [cursor=pointer]
      - listitem [ref=f1e61]:
        - text: 8004-12-23 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e62]: planned
        - link "Passengers" [ref=f1e63] [cursor=pointer]:
          - /url: /launches/61d3e274-a582-411e-9087-4766c0cbf1cf/bookings
        - group [ref=f1e65]:
          - button "Confirm" [ref=f1e66] [cursor=pointer]
          - button "Suspend" [ref=f1e67] [cursor=pointer]
      - listitem [ref=f1e68]:
        - text: 8005-06-27 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e69]: planned
        - link "Passengers" [ref=f1e70] [cursor=pointer]:
          - /url: /launches/25a40c69-2815-413f-9731-0211de0501b2/bookings
        - group [ref=f1e72]:
          - button "Confirm" [ref=f1e73] [cursor=pointer]
          - button "Suspend" [ref=f1e74] [cursor=pointer]
      - listitem [ref=f1e75]:
        - text: 8006-11-11 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e76]: planned
        - link "Passengers" [ref=f1e77] [cursor=pointer]:
          - /url: /launches/209555ca-79fc-41c2-a5fa-d95967d1dc1f/bookings
        - group [ref=f1e79]:
          - button "Confirm" [ref=f1e80] [cursor=pointer]
          - button "Suspend" [ref=f1e81] [cursor=pointer]
      - listitem [ref=f1e82]:
        - text: 8022-11-26 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e83]: planned
        - link "Passengers" [ref=f1e84] [cursor=pointer]:
          - /url: /launches/84267d31-8616-4329-bd03-32b1a2f640b6/bookings
        - group [ref=f1e86]:
          - button "Confirm" [ref=f1e87] [cursor=pointer]
          - button "Suspend" [ref=f1e88] [cursor=pointer]
      - listitem [ref=f1e89]:
        - text: 8023-01-09 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e90]: planned
        - link "Passengers" [ref=f1e91] [cursor=pointer]:
          - /url: /launches/30b070bb-285c-4b36-a605-cc5c031e2280/bookings
        - group [ref=f1e93]:
          - button "Confirm" [ref=f1e94] [cursor=pointer]
          - button "Suspend" [ref=f1e95] [cursor=pointer]
      - listitem [ref=f1e96]:
        - text: 8023-02-14 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e97]: planned
        - link "Passengers" [ref=f1e98] [cursor=pointer]:
          - /url: /launches/e7d242f8-8a92-4f48-b272-063e1d526b8a/bookings
        - group [ref=f1e100]:
          - button "Confirm" [ref=f1e101] [cursor=pointer]
          - button "Suspend" [ref=f1e102] [cursor=pointer]
      - listitem [ref=f1e103]:
        - text: 8024-11-08 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e104]: planned
        - link "Passengers" [ref=f1e105] [cursor=pointer]:
          - /url: /launches/794e5a51-3cff-4073-80c4-ab15815a174f/bookings
        - group [ref=f1e107]:
          - button "Confirm" [ref=f1e108] [cursor=pointer]
          - button "Suspend" [ref=f1e109] [cursor=pointer]
      - listitem [ref=f1e110]:
        - text: 8025-09-18 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e111]: planned
        - link "Passengers" [ref=f1e112] [cursor=pointer]:
          - /url: /launches/c651ee22-7276-4eb6-a014-aa7b1d336648/bookings
        - group [ref=f1e114]:
          - button "Confirm" [ref=f1e115] [cursor=pointer]
          - button "Suspend" [ref=f1e116] [cursor=pointer]
      - listitem [ref=f1e117]:
        - text: 8029-04-08 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e118]: planned
        - link "Passengers" [ref=f1e119] [cursor=pointer]:
          - /url: /launches/8a72d5f7-300b-42a5-bc74-f4e9f44474ac/bookings
        - group [ref=f1e121]:
          - button "Confirm" [ref=f1e122] [cursor=pointer]
          - button "Suspend" [ref=f1e123] [cursor=pointer]
      - listitem [ref=f1e124]:
        - text: 8031-01-20 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e125]: planned
        - link "Passengers" [ref=f1e126] [cursor=pointer]:
          - /url: /launches/704078a2-7c1a-49e1-9ec1-c2bd0050e56d/bookings
        - group [ref=f1e128]:
          - button "Confirm" [ref=f1e129] [cursor=pointer]
          - button "Suspend" [ref=f1e130] [cursor=pointer]
      - listitem [ref=f1e131]:
        - text: 8035-04-06 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e132]: planned
        - link "Passengers" [ref=f1e133] [cursor=pointer]:
          - /url: /launches/0680e126-088e-413b-9041-137927138c3b/bookings
        - group [ref=f1e135]:
          - button "Confirm" [ref=f1e136] [cursor=pointer]
          - button "Suspend" [ref=f1e137] [cursor=pointer]
      - listitem [ref=f1e138]:
        - text: 8049-09-30 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e139]: planned
        - link "Passengers" [ref=f1e140] [cursor=pointer]:
          - /url: /launches/0c381d5a-ff7c-4637-bcf3-794450bd843a/bookings
        - group [ref=f1e142]:
          - button "Confirm" [ref=f1e143] [cursor=pointer]
          - button "Suspend" [ref=f1e144] [cursor=pointer]
      - listitem [ref=f1e145]:
        - text: 8050-02-16 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e146]: planned
        - link "Passengers" [ref=f1e147] [cursor=pointer]:
          - /url: /launches/134d9e2b-d944-4bea-97ff-09cf0be0aa24/bookings
        - group [ref=f1e149]:
          - button "Confirm" [ref=f1e150] [cursor=pointer]
          - button "Suspend" [ref=f1e151] [cursor=pointer]
      - listitem [ref=f1e152]:
        - text: 8052-09-03 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e153]: planned
        - link "Passengers" [ref=f1e154] [cursor=pointer]:
          - /url: /launches/d7b27084-aedf-405d-9387-3981f7ff6d8d/bookings
        - group [ref=f1e156]:
          - button "Confirm" [ref=f1e157] [cursor=pointer]
          - button "Suspend" [ref=f1e158] [cursor=pointer]
      - listitem [ref=f1e159]:
        - text: 8053-09-18 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e160]: planned
        - link "Passengers" [ref=f1e161] [cursor=pointer]:
          - /url: /launches/34f6a6c7-c8cc-4d10-bc43-8f5c54069ef5/bookings
        - group [ref=f1e163]:
          - button "Confirm" [ref=f1e164] [cursor=pointer]
          - button "Suspend" [ref=f1e165] [cursor=pointer]
      - listitem [ref=f1e166]:
        - text: 8054-05-31 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e167]: planned
        - link "Passengers" [ref=f1e168] [cursor=pointer]:
          - /url: /launches/3bb4a2e6-4ab7-424e-82f4-b0e9dfcefdd0/bookings
        - group [ref=f1e170]:
          - button "Confirm" [ref=f1e171] [cursor=pointer]
          - button "Suspend" [ref=f1e172] [cursor=pointer]
      - listitem [ref=f1e173]:
        - text: 8056-10-15 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e174]: planned
        - link "Passengers" [ref=f1e175] [cursor=pointer]:
          - /url: /launches/6056834f-d6a6-4945-a0e8-732fdcd4950e/bookings
        - group [ref=f1e177]:
          - button "Confirm" [ref=f1e178] [cursor=pointer]
          - button "Suspend" [ref=f1e179] [cursor=pointer]
      - listitem [ref=f1e180]:
        - text: 8056-10-20 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e181]: planned
        - link "Passengers" [ref=f1e182] [cursor=pointer]:
          - /url: /launches/7638a9af-772c-4fbc-b0da-d6d37b22d676/bookings
        - group [ref=f1e184]:
          - button "Confirm" [ref=f1e185] [cursor=pointer]
          - button "Suspend" [ref=f1e186] [cursor=pointer]
      - listitem [ref=f1e187]:
        - text: 8060-10-06 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e188]: planned
        - link "Passengers" [ref=f1e189] [cursor=pointer]:
          - /url: /launches/17214a1a-c1b1-42c9-97da-d04297de4088/bookings
        - group [ref=f1e191]:
          - button "Confirm" [ref=f1e192] [cursor=pointer]
          - button "Suspend" [ref=f1e193] [cursor=pointer]
      - listitem [ref=f1e194]:
        - text: 8079-03-10 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e195]: planned
        - link "Passengers" [ref=f1e196] [cursor=pointer]:
          - /url: /launches/17657bc3-5b8e-4821-aae4-a1f17a79e9b4/bookings
        - group [ref=f1e198]:
          - button "Confirm" [ref=f1e199] [cursor=pointer]
          - button "Suspend" [ref=f1e200] [cursor=pointer]
      - listitem [ref=f1e201]:
        - text: 8080-11-24 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e202]: planned
        - link "Passengers" [ref=f1e203] [cursor=pointer]:
          - /url: /launches/532650e1-5d60-44d6-b44d-0aff70ff0afa/bookings
        - group [ref=f1e205]:
          - button "Confirm" [ref=f1e206] [cursor=pointer]
          - button "Suspend" [ref=f1e207] [cursor=pointer]
      - listitem [ref=f1e208]:
        - text: 8083-01-20 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e209]: planned
        - link "Passengers" [ref=f1e210] [cursor=pointer]:
          - /url: /launches/60360edb-8bd4-4159-bf6e-584a7bf8b001/bookings
        - group [ref=f1e212]:
          - button "Confirm" [ref=f1e213] [cursor=pointer]
          - button "Suspend" [ref=f1e214] [cursor=pointer]
      - listitem [ref=f1e215]:
        - text: 8083-10-28 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e216]: planned
        - link "Passengers" [ref=f1e217] [cursor=pointer]:
          - /url: /launches/ebaa3dae-4e73-4bc9-9890-e541fbab1dfc/bookings
        - group [ref=f1e219]:
          - button "Confirm" [ref=f1e220] [cursor=pointer]
          - button "Suspend" [ref=f1e221] [cursor=pointer]
      - listitem [ref=f1e222]:
        - text: 8084-08-17 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e223]: planned
        - link "Passengers" [ref=f1e224] [cursor=pointer]:
          - /url: /launches/de865079-a773-4188-ae07-2d47eea84702/bookings
        - group [ref=f1e226]:
          - button "Confirm" [ref=f1e227] [cursor=pointer]
          - button "Suspend" [ref=f1e228] [cursor=pointer]
      - listitem [ref=f1e229]:
        - text: 8087-10-03 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e230]: suspended
        - text: "weather: Strong wind"
        - link "Passengers" [ref=f1e231] [cursor=pointer]:
          - /url: /launches/e8586c41-ebdc-4b16-8b0b-ab9345922f69/bookings
      - listitem [ref=f1e232]:
        - text: 8088-04-14 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e233]: successful
        - link "Passengers" [ref=f1e234] [cursor=pointer]:
          - /url: /launches/c7b09c97-a3d5-49d4-853f-9274c33d304e/bookings
      - listitem [ref=f1e235]:
        - text: 8098-03-11 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e236]: planned
        - link "Passengers" [ref=f1e237] [cursor=pointer]:
          - /url: /launches/cc9c47c8-daa2-4e9e-93ab-0c8ef0b257da/bookings
        - group [ref=f1e239]:
          - button "Confirm" [ref=f1e240] [cursor=pointer]
          - button "Suspend" [ref=f1e241] [cursor=pointer]
      - listitem [ref=f1e242]:
        - text: 8107-04-23 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e243]: planned
        - link "Passengers" [ref=f1e244] [cursor=pointer]:
          - /url: /launches/1a77c82b-8c7f-47aa-b229-f400b96fcb28/bookings
        - group [ref=f1e246]:
          - button "Confirm" [ref=f1e247] [cursor=pointer]
          - button "Suspend" [ref=f1e248] [cursor=pointer]
      - listitem [ref=f1e249]:
        - text: 8107-10-31 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e250]: planned
        - link "Passengers" [ref=f1e251] [cursor=pointer]:
          - /url: /launches/0dc9ee64-3dda-4e95-a663-bd29bd11e7a1/bookings
        - group [ref=f1e253]:
          - button "Confirm" [ref=f1e254] [cursor=pointer]
          - button "Suspend" [ref=f1e255] [cursor=pointer]
      - listitem [ref=f1e256]:
        - text: 8108-05-21 · Booking Rocket 1793727220229-7-556045 · 100 per passenger ·
        - generic [ref=f1e257]: planned
        - link "Passengers" [ref=f1e258] [cursor=pointer]:
          - /url: /launches/724c410e-1165-4a6e-bd64-298a5654b242/bookings
        - group [ref=f1e260]:
          - button "Confirm" [ref=f1e261] [cursor=pointer]
          - button "Suspend" [ref=f1e262] [cursor=pointer]
      - listitem [ref=f1e263]:
        - text: 8483-03-26 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e264]: planned
        - link "Passengers" [ref=f1e265] [cursor=pointer]:
          - /url: /launches/3e3a3806-db4d-4ffe-a81e-039ca51a9837/bookings
        - group [ref=f1e267]:
          - button "Confirm" [ref=f1e268] [cursor=pointer]
          - button "Suspend" [ref=f1e269] [cursor=pointer]
      - listitem [ref=f1e270]:
        - text: 8501-09-29 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e271]: planned
        - link "Passengers" [ref=f1e272] [cursor=pointer]:
          - /url: /launches/069f7a04-cea0-4aef-adba-eafd46d0aa82/bookings
        - group [ref=f1e274]:
          - button "Confirm" [ref=f1e275] [cursor=pointer]
          - button "Suspend" [ref=f1e276] [cursor=pointer]
      - listitem [ref=f1e277]:
        - text: 8508-05-31 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e278]: planned
        - link "Passengers" [ref=f1e279] [cursor=pointer]:
          - /url: /launches/5736ef84-8d7d-4655-8d60-709fa41f7e45/bookings
        - group [ref=f1e281]:
          - button "Confirm" [ref=f1e282] [cursor=pointer]
          - button "Suspend" [ref=f1e283] [cursor=pointer]
      - listitem [ref=f1e284]:
        - text: 8512-03-15 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e285]: confirmed
        - link "Passengers" [ref=f1e286] [cursor=pointer]:
          - /url: /launches/f5b3e081-3662-4869-88a0-395ac4c4d0f5/bookings
        - group [ref=f1e288]:
          - button "Success" [ref=f1e289] [cursor=pointer]
          - button "Fail" [ref=f1e290] [cursor=pointer]
          - button "Suspend" [ref=f1e291] [cursor=pointer]
      - listitem [ref=f1e292]:
        - text: 8514-01-17 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e293]: successful
        - link "Passengers" [ref=f1e294] [cursor=pointer]:
          - /url: /launches/7e639411-fc7f-4383-919b-99f428e9d49e/bookings
      - listitem [ref=f1e295]:
        - text: 8514-09-15 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e296]: planned
        - link "Passengers" [ref=f1e297] [cursor=pointer]:
          - /url: /launches/1cabf871-2854-446b-8f23-eb90781c829a/bookings
        - group [ref=f1e299]:
          - button "Confirm" [ref=f1e300] [cursor=pointer]
          - button "Suspend" [ref=f1e301] [cursor=pointer]
      - listitem [ref=f1e302]:
        - text: 8515-09-28 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e303]: failed
        - link "Passengers" [ref=f1e304] [cursor=pointer]:
          - /url: /launches/6a0e0ec0-3e11-4454-b8ab-5723ff0ca40b/bookings
      - listitem [ref=f1e305]:
        - text: 8522-03-27 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e306]: planned
        - link "Passengers" [ref=f1e307] [cursor=pointer]:
          - /url: /launches/08101f7e-c5a4-47fb-9838-cef04acd4c53/bookings
        - group [ref=f1e309]:
          - button "Confirm" [ref=f1e310] [cursor=pointer]
          - button "Suspend" [ref=f1e311] [cursor=pointer]
      - listitem [ref=f1e312]:
        - text: 8526-11-10 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e313]: planned
        - link "Passengers" [ref=f1e314] [cursor=pointer]:
          - /url: /launches/aa991811-08cc-464c-843c-ef4fa56ded39/bookings
        - group [ref=f1e316]:
          - button "Confirm" [ref=f1e317] [cursor=pointer]
          - button "Suspend" [ref=f1e318] [cursor=pointer]
      - listitem [ref=f1e319]:
        - text: 8534-06-17 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e320]: successful
        - link "Passengers" [ref=f1e321] [cursor=pointer]:
          - /url: /launches/eaa7345e-3899-48c1-82d5-f8f9581a8764/bookings
      - listitem [ref=f1e322]:
        - text: 8542-01-23 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e323]: suspended
        - text: "weather: Strong wind"
        - link "Passengers" [ref=f1e324] [cursor=pointer]:
          - /url: /launches/afc83447-4cff-4b4a-a7c7-6586f7cc7cdd/bookings
      - listitem [ref=f1e325]:
        - text: 8542-02-12 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e326]: failed
        - link "Passengers" [ref=f1e327] [cursor=pointer]:
          - /url: /launches/3a0ba2c7-0923-49b7-8ac0-af1a6b21fce8/bookings
      - listitem [ref=f1e328]:
        - text: 8543-02-23 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e329]: planned
        - link "Passengers" [ref=f1e330] [cursor=pointer]:
          - /url: /launches/90db423b-232b-4b45-9f71-3d2857e9d810/bookings
        - group [ref=f1e332]:
          - button "Confirm" [ref=f1e333] [cursor=pointer]
          - button "Suspend" [ref=f1e334] [cursor=pointer]
      - listitem [ref=f1e335]:
        - text: 8547-02-27 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e336]: planned
        - link "Passengers" [ref=f1e337] [cursor=pointer]:
          - /url: /launches/124212b1-f347-4bc3-bce3-48b807bf5f2f/bookings
        - group [ref=f1e339]:
          - button "Confirm" [ref=f1e340] [cursor=pointer]
          - button "Suspend" [ref=f1e341] [cursor=pointer]
      - listitem [ref=f1e342]:
        - text: 8551-12-05 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e343]: planned
        - link "Passengers" [ref=f1e344] [cursor=pointer]:
          - /url: /launches/92cee577-5b1c-4d94-abfd-bd7f8b7cdad6/bookings
        - group [ref=f1e346]:
          - button "Confirm" [ref=f1e347] [cursor=pointer]
          - button "Suspend" [ref=f1e348] [cursor=pointer]
      - listitem [ref=f1e349]:
        - text: 8554-06-11 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e350]: planned
        - link "Passengers" [ref=f1e351] [cursor=pointer]:
          - /url: /launches/8ab375c7-edb2-4687-b603-c312115e4859/bookings
        - group [ref=f1e353]:
          - button "Confirm" [ref=f1e354] [cursor=pointer]
          - button "Suspend" [ref=f1e355] [cursor=pointer]
      - listitem [ref=f1e356]:
        - text: 8557-06-01 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e357]: planned
        - link "Passengers" [ref=f1e358] [cursor=pointer]:
          - /url: /launches/582db9b9-bab1-4773-a805-abc3e1e98da3/bookings
        - group [ref=f1e360]:
          - button "Confirm" [ref=f1e361] [cursor=pointer]
          - button "Suspend" [ref=f1e362] [cursor=pointer]
      - listitem [ref=f1e363]:
        - text: 8566-05-11 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e364]: successful
        - link "Passengers" [ref=f1e365] [cursor=pointer]:
          - /url: /launches/f8c865b9-07bf-4021-a84e-235e428a1daf/bookings
      - listitem [ref=f1e366]:
        - text: 8575-08-31 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e367]: planned
        - link "Passengers" [ref=f1e368] [cursor=pointer]:
          - /url: /launches/15be6e81-4756-40a0-a90d-f4daa1337f1b/bookings
        - group [ref=f1e370]:
          - button "Confirm" [ref=f1e371] [cursor=pointer]
          - button "Suspend" [ref=f1e372] [cursor=pointer]
      - listitem [ref=f1e373]:
        - text: 8581-07-18 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e374]: confirmed
        - link "Passengers" [ref=f1e375] [cursor=pointer]:
          - /url: /launches/8f2f1970-8c08-455e-a19c-7155870aa022/bookings
        - group [ref=f1e377]:
          - button "Success" [ref=f1e378] [cursor=pointer]
          - button "Fail" [ref=f1e379] [cursor=pointer]
          - button "Suspend" [ref=f1e380] [cursor=pointer]
      - listitem [ref=f1e381]:
        - text: 8584-12-15 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e382]: suspended
        - text: "technical: Engine leak"
        - link "Passengers" [ref=f1e383] [cursor=pointer]:
          - /url: /launches/8a4da0ac-27a0-4f45-877d-eb8ffdf82d95/bookings
      - listitem [ref=f1e384]:
        - text: 8587-09-09 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e385]: planned
        - link "Passengers" [ref=f1e386] [cursor=pointer]:
          - /url: /launches/ae93e26c-62eb-4d5f-9e9f-6fb8fc66fe2e/bookings
        - group [ref=f1e388]:
          - button "Confirm" [ref=f1e389] [cursor=pointer]
          - button "Suspend" [ref=f1e390] [cursor=pointer]
      - listitem [ref=f1e391]:
        - text: 8589-01-18 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e392]: planned
        - link "Passengers" [ref=f1e393] [cursor=pointer]:
          - /url: /launches/34eead24-d596-4d6c-bc3e-b6ad2f155411/bookings
        - group [ref=f1e395]:
          - button "Confirm" [ref=f1e396] [cursor=pointer]
          - button "Suspend" [ref=f1e397] [cursor=pointer]
      - listitem [ref=f1e398]:
        - text: 8595-04-27 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e399]: planned
        - link "Passengers" [ref=f1e400] [cursor=pointer]:
          - /url: /launches/138a05a1-a270-4c71-bffe-4feb235f12c6/bookings
        - group [ref=f1e402]:
          - button "Confirm" [ref=f1e403] [cursor=pointer]
          - button "Suspend" [ref=f1e404] [cursor=pointer]
      - listitem [ref=f1e405]:
        - text: 8598-05-15 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e406]: planned
        - link "Passengers" [ref=f1e407] [cursor=pointer]:
          - /url: /launches/f7a9c2db-2995-4309-98c1-8b4b1ce070ad/bookings
        - group [ref=f1e409]:
          - button "Confirm" [ref=f1e410] [cursor=pointer]
          - button "Suspend" [ref=f1e411] [cursor=pointer]
      - listitem [ref=f1e412]:
        - text: 8604-09-26 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e413]: planned
        - link "Passengers" [ref=f1e414] [cursor=pointer]:
          - /url: /launches/73a63b4b-83cf-4247-aa34-a3d50452aac4/bookings
        - group [ref=f1e416]:
          - button "Confirm" [ref=f1e417] [cursor=pointer]
          - button "Suspend" [ref=f1e418] [cursor=pointer]
      - listitem [ref=f1e419]:
        - text: 8609-09-06 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e420]: planned
        - link "Passengers" [ref=f1e421] [cursor=pointer]:
          - /url: /launches/4d067ff6-e584-4ab4-ba2a-4d107f6c8361/bookings
        - group [ref=f1e423]:
          - button "Confirm" [ref=f1e424] [cursor=pointer]
          - button "Suspend" [ref=f1e425] [cursor=pointer]
      - listitem [ref=f1e426]:
        - text: 8613-12-07 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e427]: planned
        - link "Passengers" [ref=f1e428] [cursor=pointer]:
          - /url: /launches/a3ed5ba9-462e-415a-b846-a1711ddbc1d8/bookings
        - group [ref=f1e430]:
          - button "Confirm" [ref=f1e431] [cursor=pointer]
          - button "Suspend" [ref=f1e432] [cursor=pointer]
      - listitem [ref=f1e433]:
        - text: 8621-07-16 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e434]: planned
        - link "Passengers" [ref=f1e435] [cursor=pointer]:
          - /url: /launches/08f80bdb-7fca-495d-867f-780cd029cbdd/bookings
        - group [ref=f1e437]:
          - button "Confirm" [ref=f1e438] [cursor=pointer]
          - button "Suspend" [ref=f1e439] [cursor=pointer]
      - listitem [ref=f1e440]:
        - text: 8625-10-01 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e441]: planned
        - link "Passengers" [ref=f1e442] [cursor=pointer]:
          - /url: /launches/0190eff3-5bb3-40e2-bb78-4089ec8654f4/bookings
        - group [ref=f1e444]:
          - button "Confirm" [ref=f1e445] [cursor=pointer]
          - button "Suspend" [ref=f1e446] [cursor=pointer]
      - listitem [ref=f1e447]:
        - text: 8626-06-24 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e448]: planned
        - link "Passengers" [ref=f1e449] [cursor=pointer]:
          - /url: /launches/931dfd8e-fa26-4ab5-b9be-ae05c5e2346a/bookings
        - group [ref=f1e451]:
          - button "Confirm" [ref=f1e452] [cursor=pointer]
          - button "Suspend" [ref=f1e453] [cursor=pointer]
      - listitem [ref=f1e454]:
        - text: 8628-08-19 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e455]: planned
        - link "Passengers" [ref=f1e456] [cursor=pointer]:
          - /url: /launches/f13203ef-b2b0-4246-8e3f-692e50009368/bookings
        - group [ref=f1e458]:
          - button "Confirm" [ref=f1e459] [cursor=pointer]
          - button "Suspend" [ref=f1e460] [cursor=pointer]
      - listitem [ref=f1e461]:
        - text: 8637-02-07 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e462]: planned
        - link "Passengers" [ref=f1e463] [cursor=pointer]:
          - /url: /launches/6594ac10-0d23-453f-8af9-234015e1e867/bookings
        - group [ref=f1e465]:
          - button "Confirm" [ref=f1e466] [cursor=pointer]
          - button "Suspend" [ref=f1e467] [cursor=pointer]
      - listitem [ref=f1e468]:
        - text: 8642-10-09 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e469]: planned
        - link "Passengers" [ref=f1e470] [cursor=pointer]:
          - /url: /launches/3e8941c5-04e2-42e8-b822-5fdabebebd46/bookings
        - group [ref=f1e472]:
          - button "Confirm" [ref=f1e473] [cursor=pointer]
          - button "Suspend" [ref=f1e474] [cursor=pointer]
      - listitem [ref=f1e475]:
        - text: 8648-01-11 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e476]: planned
        - link "Passengers" [ref=f1e477] [cursor=pointer]:
          - /url: /launches/b798d79f-b1de-4811-83f5-deff7c2a06ba/bookings
        - group [ref=f1e479]:
          - button "Confirm" [ref=f1e480] [cursor=pointer]
          - button "Suspend" [ref=f1e481] [cursor=pointer]
      - listitem [ref=f1e482]:
        - text: 8648-04-07 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e483]: planned
        - link "Passengers" [ref=f1e484] [cursor=pointer]:
          - /url: /launches/93de73b5-fd7a-45dc-83a4-4bba5063455d/bookings
        - group [ref=f1e486]:
          - button "Confirm" [ref=f1e487] [cursor=pointer]
          - button "Suspend" [ref=f1e488] [cursor=pointer]
      - listitem [ref=f1e489]:
        - text: 8660-03-07 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e490]: planned
        - link "Passengers" [ref=f1e491] [cursor=pointer]:
          - /url: /launches/65c81ec1-4013-4cd9-8cd4-875b855c671a/bookings
        - group [ref=f1e493]:
          - button "Confirm" [ref=f1e494] [cursor=pointer]
          - button "Suspend" [ref=f1e495] [cursor=pointer]
      - listitem [ref=f1e496]:
        - text: 8663-10-02 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e497]: planned
        - link "Passengers" [ref=f1e498] [cursor=pointer]:
          - /url: /launches/1a561fb1-3845-4988-bed5-0f07554ae4ff/bookings
        - group [ref=f1e500]:
          - button "Confirm" [ref=f1e501] [cursor=pointer]
          - button "Suspend" [ref=f1e502] [cursor=pointer]
      - listitem [ref=f1e503]:
        - text: 8666-10-08 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e504]: planned
        - link "Passengers" [ref=f1e505] [cursor=pointer]:
          - /url: /launches/9e80a185-1fce-4b5f-8ef6-3414cc60ee02/bookings
        - group [ref=f1e507]:
          - button "Confirm" [ref=f1e508] [cursor=pointer]
          - button "Suspend" [ref=f1e509] [cursor=pointer]
      - listitem [ref=f1e510]:
        - text: 8667-10-16 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e511]: planned
        - link "Passengers" [ref=f1e512] [cursor=pointer]:
          - /url: /launches/04ea37b4-45a8-4b5b-beb4-45a6eee50896/bookings
        - group [ref=f1e514]:
          - button "Confirm" [ref=f1e515] [cursor=pointer]
          - button "Suspend" [ref=f1e516] [cursor=pointer]
      - listitem [ref=f1e517]:
        - text: 8678-10-15 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e518]: planned
        - link "Passengers" [ref=f1e519] [cursor=pointer]:
          - /url: /launches/65289d9d-aaa3-4b32-958e-9134df11f3e7/bookings
        - group [ref=f1e521]:
          - button "Confirm" [ref=f1e522] [cursor=pointer]
          - button "Suspend" [ref=f1e523] [cursor=pointer]
      - listitem [ref=f1e524]:
        - text: 8680-03-06 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e525]: planned
        - link "Passengers" [ref=f1e526] [cursor=pointer]:
          - /url: /launches/fbb0514e-edad-4990-88a2-06ffba911d30/bookings
        - group [ref=f1e528]:
          - button "Confirm" [ref=f1e529] [cursor=pointer]
          - button "Suspend" [ref=f1e530] [cursor=pointer]
      - listitem [ref=f1e531]:
        - text: 8686-10-27 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e532]: planned
        - link "Passengers" [ref=f1e533] [cursor=pointer]:
          - /url: /launches/cb643810-0259-4e50-991e-50c9d597f880/bookings
        - group [ref=f1e535]:
          - button "Confirm" [ref=f1e536] [cursor=pointer]
          - button "Suspend" [ref=f1e537] [cursor=pointer]
      - listitem [ref=f1e538]:
        - text: 8688-05-25 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e539]: planned
        - link "Passengers" [ref=f1e540] [cursor=pointer]:
          - /url: /launches/4fbef112-7c34-464e-87cb-100e3320ede3/bookings
        - group [ref=f1e542]:
          - button "Confirm" [ref=f1e543] [cursor=pointer]
          - button "Suspend" [ref=f1e544] [cursor=pointer]
      - listitem [ref=f1e545]:
        - text: 8700-12-18 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e546]: planned
        - link "Passengers" [ref=f1e547] [cursor=pointer]:
          - /url: /launches/8648e8d2-7bcf-4ecb-bb75-b7abfda1d087/bookings
        - group [ref=f1e549]:
          - button "Confirm" [ref=f1e550] [cursor=pointer]
          - button "Suspend" [ref=f1e551] [cursor=pointer]
      - listitem [ref=f1e552]:
        - text: 8702-08-08 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e553]: planned
        - link "Passengers" [ref=f1e554] [cursor=pointer]:
          - /url: /launches/5e00c945-c042-4d3b-b7cb-e0044a62757e/bookings
        - group [ref=f1e556]:
          - button "Confirm" [ref=f1e557] [cursor=pointer]
          - button "Suspend" [ref=f1e558] [cursor=pointer]
      - listitem [ref=f1e559]:
        - text: 8706-04-25 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e560]: planned
        - link "Passengers" [ref=f1e561] [cursor=pointer]:
          - /url: /launches/a29ea773-ac02-416a-9889-976bacc43e3a/bookings
        - group [ref=f1e563]:
          - button "Confirm" [ref=f1e564] [cursor=pointer]
          - button "Suspend" [ref=f1e565] [cursor=pointer]
      - listitem [ref=f1e566]:
        - text: 8712-03-11 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e567]: planned
        - link "Passengers" [ref=f1e568] [cursor=pointer]:
          - /url: /launches/df4184a4-d5af-45a4-87c8-60354cd7dfea/bookings
        - group [ref=f1e570]:
          - button "Confirm" [ref=f1e571] [cursor=pointer]
          - button "Suspend" [ref=f1e572] [cursor=pointer]
      - listitem [ref=f1e573]:
        - text: 8717-06-27 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e574]: suspended
        - text: "weather: Strong wind"
        - link "Passengers" [ref=f1e575] [cursor=pointer]:
          - /url: /launches/f39c6c87-7a53-449b-8446-d0b44874164a/bookings
      - listitem [ref=f1e576]:
        - text: 8718-10-23 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e577]: successful
        - link "Passengers" [ref=f1e578] [cursor=pointer]:
          - /url: /launches/fc895f7a-90f3-477d-b926-50b43c7f59eb/bookings
      - listitem [ref=f1e579]:
        - text: 8728-06-03 · Booking Rocket 1793727447547-5-693972 · 100 per passenger ·
        - generic [ref=f1e580]: planned
        - link "Passengers" [ref=f1e581] [cursor=pointer]:
          - /url: /launches/29adf7f2-1430-462c-a7d8-5d1dbf8d8b65/bookings
        - group [ref=f1e583]:
          - button "Confirm" [ref=f1e584] [cursor=pointer]
          - button "Suspend" [ref=f1e585] [cursor=pointer]
      - listitem [ref=f1e586]:
        - text: 8731-10-29 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e587]: planned
        - link "Passengers" [ref=f1e588] [cursor=pointer]:
          - /url: /launches/0f44399d-88b3-4f49-add4-4b40b3db96cd/bookings
        - group [ref=f1e590]:
          - button "Confirm" [ref=f1e591] [cursor=pointer]
          - button "Suspend" [ref=f1e592] [cursor=pointer]
    - status
    - generic [ref=f1e593]:
      - heading "Schedule a launch" [level=2] [ref=f1e594]
      - status [ref=f1e595]: Launch scheduled
      - generic [ref=f1e596]:
        - generic [ref=f1e597]:
          - text: Rocket
          - combobox "Rocket" [ref=f1e598]:
            - option "Booking Rocket 1793727220229-7-556045" [selected]
            - option "Booking Rocket 1793727447547-5-693972"
            - option "Falcon 1793727355083141"
            - option "Falcon 1793727356673578"
            - option "Falcon 1793727356699635"
            - option "Falcon 1793727356859606"
            - option "Falcon 1793727357235198"
            - option "Falcon 1793727357435179"
            - option "Falcon 1793727357445936"
            - option "Falcon 1793727357763138"
            - option "Seed Rocket"
            - option "Vega 1793727356674149"
            - option "Vega 1793727356699217"
            - option "Vega 1793727357435801"
          - status
        - generic [ref=f1e599]:
          - text: Date
          - textbox "Date" [ref=f1e600]
          - status
        - generic [ref=f1e601]:
          - text: Price per passenger
          - spinbutton "Price per passenger" [ref=f1e602]
          - status
        - button "Schedule launch" [active] [ref=f1e603] [cursor=pointer]
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