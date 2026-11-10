# Grocery Store App (FreshMart)

A grocery delivery and in-store smart navigation app based on the **Grocery Store App** Sketch UI Kit (29 artboards across Material and Neumorphic design paradigms by Ami Moradia). Built with **React Native 0.88+**, **Expo SDK 58+**, and **Expo Router** using **pure JavaScript and JSX (`.js`, `.jsx`)**.

---

## 🎨 Artboards & Features (based on 29 design artboards)

| # | Artboard Name | Sketch ID | Screen Location | Description |
|---|---|---|---|---|
| 1 | **Home_01 (Material)** | `CF422FB1-A201-4E5F-8BF6-ECAB3D74DD1E` | `src/app/(tabs)/index.jsx` | January cashback promo banner (30%), Covid-19 Safety Standards, category chips, nearby stores. |
| 2 | **Home_02 (Featured)** | `AD22A214-64ED-4728-894C-81C8E1ECA495` | `src/app/(tabs)/index.jsx` | Featured products grid with in-store shelf locations. |
| 3 | **Home_01 & 02 (Neumorphic)** | `66A73001...` & `CC4B7626...` | `src/app/(tabs)/index.jsx` | Soft surface elevation and neumorphic card components. |
| 4 | **Stores** | `EB36C4C2-237D-4515-A61C-8E0F7E3D20DD` | `src/app/(tabs)/index.jsx` | Near By Stores list: More Mega Store (Bellandur), Village Hypermarket (HSR Layout), Simpli Namdhari's. |
| 5 | **Particular store details** | `B86E12D5-6FCF-450E-B4F9-F5CE3B3B9533` | `src/app/store-detail.jsx` | Store profile (Market Square Mall, Bellandur, 5km), department filters (*Fruits, Vegetables, Bakery*). |
| 6 | **Cart** | `31D6604B-8DD7-4C05-97C2-859F3A375CD9` | `src/app/(tabs)/cart.jsx` | Active cart with store header, item shelf numbers (*Tomato Shelf 1, Spinach Shelf 1, Milk Shelf 2*). |
| 7 | **Cart Summary** | `26066909-0C5D-4B83-9A54-0AB3B683B9F3` | `src/app/(tabs)/cart.jsx` | Item totals, delivery fee breakdown, and checkout action. |
| 8 | **Empty cart** | `BD6A54CC-CBFB-4E38-9310-DAB00ACB9641` | `src/app/(tabs)/cart.jsx` | Empty cart state (*"No Items in the Cart - Add some items to see it here"*). |
| 9 | **Path finding** | `695018E8-0267-4B9B-B76F-0204F6FE212A` | `src/app/pathfinding.jsx` | Smart in-store navigation: *"Follow the path (10m straight)"*, target Maggi (*Shelf 1 • 30s away*). |
| 10 | **Delivery options** | `EF3C5C52-BA5A-452D-B8C3-39FCAB747CBA` | `src/app/checkout.jsx` | Delivery mode selection: Regular Delivery, Express Delivery (2-3 hrs), In-Store Pickup. |
| 11 | **Address options** | `E5E74579-CC79-4B7F-9880-F652E5620DFC` | `src/app/checkout.jsx` | Delivery address selection: Home (Mantri Square) vs Office (HAL 3rd Stage). |
| 12 | **Payment options** | `47E6D100-308D-4A6B-B1F6-A05533538E21` | `src/app/checkout.jsx` | Payment methods: Debit/Credit Card, Paytm, PhonePe, Freecharge, Cash on Delivery. |
| 13 | **Orders** & **Past orders** | `22607D42...` & `8E8B41F0...` | `src/app/(tabs)/orders.jsx` | Past orders list (*Village Hypermarket, Nilgiris, More Mega Store*) with one-click Reorder. |
| 14 | **User Profile** | `BBE998C4-2A58-48EC-A157-40A804433034` | `src/app/(tabs)/profile.jsx` | Sanjeev Gupta profile, Edit Profile, Shipping Address, Order History, Notification, Cards, Logout. |

---

## 💎 Design Tokens

- **Brand Green**: `#22A45D` / `#E8F8EE` / `#198047`
- **Accent Orange**: `#FF9800`
- **Dark Text**: `#1E2022`
- **Sub Text**: `#77838F`
- **Surface**: `#FFFFFF` / `#F8F9FA`

---

## 🚀 Running the App

```bash
# Start development server
npx expo start
```

<!-- run-locally:start -->

## ▶️ Run locally

```bash
npm install
npx expo start
```

Then press `i` for the iOS simulator, `a` for Android, or `w` for the web, or scan the QR code with Expo Go.

<!-- run-locally:end -->

---

<!-- design-credits:start -->

## 🎨 Design Credits

This app is based on the free **Grocery Store App Concept** design by **Ami Moradia**, downloaded from Sketch App Sources. All visual design credit goes to the designer. It follows the design's screens, user flows and content; visual details (exact spacing, fonts, some colours and illustrations) are approximated and may differ from the original.

| | |
|---|---|
| Designer | [Ami Moradia](https://www.sketchappsources.com/contributor/amimoradia) |
| Original design | [Grocery Store App Concept](https://www.behance.net/gallery/111669101/Grocery-App-Free-download) |
| Downloaded from | [Sketch App Sources](https://www.sketchappsources.com/free-source/4669-grocery-store-app-concept-sketch-freebie-resource.html) |
| Dribbble | <http://www.dribbble.com/amimoradia> |
| Original file | `grocery-store-app-ami-moradia.sketch` |
| License / usage | Not stated on the source page. Free download; credit the designer (Sketch App Sources Terms) and confirm with them before commercial use. |

**Attribution:**

> UI design: "Grocery Store App Concept" by Ami Moradia (https://www.behance.net/gallery/111669101/Grocery-App-Free-download), downloaded from Sketch App Sources (https://www.sketchappsources.com/free-source/4669-grocery-store-app-concept-sketch-freebie-resource.html).

The original design source files are not included in this repository; get them from the links above. This app's **code** is released under the [MIT License](./LICENSE); the visual design remains the designer's (see [NOTICE](./NOTICE)).

Photos, brand logos and avatars inside the design may belong to third parties and are not covered by the designer's permission.

<!-- design-credits:end -->
