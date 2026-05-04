# WASM Interop

This project is made as part of the Bachelor's thesis by Iļja Krasavins, ik22076.

The following paragraphs describe how the project is structured and what the needed setup process is.

## Prerequisites

Make sure that you have these programs and utilities installed:
- [Node.js](https://nodejs.org/en), preferrably at least version [20.14.0](https://nodejs.org/download/release/v20.14.0/) which is what was used to test the project;
- [Python 3](https://www.python.org/downloads/), preferrably version [3.11.9](https://www.python.org/downloads/release/python-3119/) which is what was used to test the project;
- [Rust](https://rust-lang.org/tools/install/), the latest version of which was used to test the project;
- [wasm-pack](https://github.com/wasm-bindgen/wasm-pack), which can be installed with `cargo install wasm-pack` once Rust has been installed, see more about the cargo package [here](https://crates.io/crates/wasm-pack).

## Shortcut scripts
If you wish to speed up testing and developing a bit, you may use additional PowerShell scripts located at the root of the project.
1. `buildAndMoveWasm.ps1` - builds all WebAssembly modules, both for the Python API and for the Web app, then moves them into the appropriate directories. **It should be ran FIRST after the project has been cloned**, since the repo omits WASM modules, and should be re-ran on any changes to the modules. 
2. `runWebAndApi.ps1` - launches two separate terminal windows, installs dependencies for both the Python API and the Web app, and launches them both. After launching, the Web app will be available through [http://localhost:8080/](http://localhost:8080/) and the API will be available through [http://localhost:8000/](http://localhost:8000/). To exit them, use Ctrl+C in both terminal windows.

Main PowerShell scripts are located at the root of the project. The helper scripts can be found in the `powershell/` directory.

## Rust to WASM via wasm-pack

This project uses [wasm-pack](https://github.com/wasm-bindgen/wasm-pack) to compile Rust into WebAssembly modules. To compile the module, go to the directory of the functionality you need, then either run `wasm-pack build --target web --features js` to build for JS use or run `cargo build --target wasm32-unknown-unknown --release` for Python use.

The build results are handled differently per the build target. Typically, the `wasm` folder for JS will be moved from the `pkg` directory to the `web/public/assets/js/xxx/wasm` directory, where `xxx` is the name of the benchmark. For Python, the `.wasm` file will be moved from the `target\wasm32-unknown-unknown\release` directory to the `python/wasm_modules` directory. If you need any more info, look at the build scripts in `powershell/wasm`, as those are typically used to make building and moving WebAssembly modules easier.

If you wish to create a new WebAssembly module, use the `wasm-pack new xxx` command first, where `xxx` is the name of your future module. Keep in mind that both a simple, JS-compatible export for a function and a raw one need to be created. Follow the examples provided in existing modules, e.g. `pi-approx`, to figure out how exactly to structure and create the project.

## Python

In this project, the backend API is built using [Python](https://www.python.org/) and the [fastapi](https://fastapi.tiangolo.com/) library.

The repository was created using Python 3.11. Compatibility with other versions of Python is likely, but not guaranteed.

To launch the project, first create the virtual environment and install all the packages listed in requirements.txt in the `/python` directory - here is how that can be done on Windows:

```
cd python
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
```

The second command in unecessary if you already created the virtual environment. The fourth command is unnecessary if you ran it and haven't updated the `requirements.txt` since then.

After you have activated the virtual environment, you can launch the project via the `fastapi dev` command from the same directory. The API will available through [http://localhost:8000/](http://localhost:8000/).
To later exit the virtual environment, use the `deactivate` command.

For ease of use, you may install [pigar](https://github.com/damnever/pigar) to your virtual environment to keep the `requirements.txt` up to date. Simply run `pigar generate` after adding/removing packages. Make sure to be in the virtual environment before running it.

# Front-end Web app

The front-end web app is a minimal static website which uses [http-server](https://www.npmjs.com/package/http-server) to be hosted and utilizes [Pico CSS](https://picocss.com/) via [CDN](https://picocss.com/docs#usage-from-cdn) for minimal styling.

To start, first install all the dependencies. Use `npm install` at the root of the `/web` directory for that. After that is done, you can simply launch the web app from by using `npm run start`. If the ports weren't changed by you, the API will be available through [http://localhost:8080/](http://localhost:8080/).
