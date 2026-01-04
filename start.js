module.exports = {
  requires: {
    bundle: "ai",
  },
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        venv: "../env",
        env: {
          "PYTORCH_ENABLE_MPS_FALLBACK": "1"  
        },
        path: "app/inference",
        message: [
          "python gradio_web_demo.py"
        ],
        on: [{
          "event": "/http:\/\/\\S+/",
          "done": true
        }]
      }
    },
    {
      method: "local.set",
      params: {
        url: "{{input.event[0]}}"
      }
    }
  ]
}
