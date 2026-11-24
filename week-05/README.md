# Week 5 · Frontend for your API

Lessons: HTML, CSS, JavaScript, calling your API, forms, client brief.

- `final/noor-foods-web/` — finished code for the week (products page, search, order form, staff page).
- `final/personal-website/` — example end product for the assignment "your personal website with Tailwind". See its `README.md`.
- `in-class/` — empty; the instructor codes here during the live session.

## Run

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

## Test

- Products load; search by `rice`, pick a category, tick "In stock only".
- Order customer 90, product 21, quantity 1 → "Order ... placed for Waqas Farooq".
- Order customer 999999 → "Order not placed: Customer not found".
- http://127.0.0.1:5500/staff.html shows low stock and pending orders; Confirm removes an order.
