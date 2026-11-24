# Week 5 · Frontend for your API

Lessons: HTML, CSS, Tailwind CSS, JavaScript, calling your API, forms, client brief.

- `final/noor-foods-web/` — finished code for the week (products page, search, order form, staff page).
- `final/personal-website/` — example end product for the assignment below. See its `README.md`.
- `in-class/` — empty; the instructor codes here during the live session.

## Assignment: your personal website with Tailwind

Build a one-page personal site about you, styled only with Tailwind classes (no custom CSS file).

Must have:

- A header with your name and links to each section.
- An intro: one or two sentences on what you build, plus your photo.
- Your work: at least two projects from this course (for example Noor Foods API and web), each with a line on what it does and the tools used.
- About: a short paragraph about you and the tools you use.
- Contact: your email and links to GitHub and LinkedIn.
- Works on a phone: check it at phone width in the browser dev tools.

Keep it plain: few colours, one or two fonts, no emoji icons or stock gradients. See `final/personal-website/` for an example of the finished result.

Submit: push it to your own GitHub repo and share the link.

## Run (Noor Foods web)

1. Start your week 4 API (`uv run fastapi dev` in `noor-foods-api`) with `noor-foods-db` running in Docker.
2. The API needs CORS for the page. In `noor-foods-api`:
   - `config.py`: add `cors_origins: list[str] = ["http://127.0.0.1:5500"]` to `Settings`.
   - `main.py`: `from fastapi.middleware.cors import CORSMiddleware`, then after `app = FastAPI(...)`:
     ```python
     app.add_middleware(
         CORSMiddleware,
         allow_origins=get_settings().cors_origins,
         allow_methods=["*"],
         allow_headers=["*"],
     )
     ```
3. Open `final/noor-foods-web` in VS Code and click **Go Live** (Live Server extension).
4. Use http://127.0.0.1:5500 (not `localhost:5500`, or CORS blocks it).

## Test (Noor Foods web)

- Products load; search by `rice`, pick a category, tick "In stock only".
- Order customer 90, product 21, quantity 1 → "Order ... placed for Waqas Farooq".
- Order customer 999999 → "Order not placed: Customer not found".
- http://127.0.0.1:5500/staff.html shows low stock and pending orders; Confirm removes an order.
