from wasmtime import Store, Module, Instance
import os

class WasmRuntime:
    def __init__(self, wasm_path: str):
        self.store = Store()
        base_dir = os.path.dirname(os.path.abspath(__file__))
        full_path = os.path.join(base_dir, wasm_path)
        self.module = Module.from_file(self.store.engine, full_path)
        self.instance = Instance(self.store, self.module, [])

    def call(self, fn_name: str, *args):
        fn = self.instance.exports(self.store)[fn_name]
        return fn(self.store, *args)
