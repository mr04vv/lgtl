import nikukyu2 from "/static/nikukyu2.svg";
import { html } from "hono/html";

export const Uploader = async () => {
  return (
    <div>
      {html`
        <div
          style="display: flex; flex-direction: column; height: 24px;"
          x-data="{
            files: null,
            imageUrl: null,
            error: null,
            submit() {
            const data = new FormData();
            data.append('file', this.files[0]);
            fetch('/api/upload', {
              method: 'POST',
              body: data,
            })
            .then(response => {
              if (response.ok) {
                return response.json();
              }
              this.error = true;
              setTimeout(() => {
                this.error = false;
              }, 2000);
            })
       }}"
        >
          <div style="height: 100%;">
            <input
              type="file"
              id="file"
              accept="image/*, video/*"
              x-on:change="
              files = Object.values($event.target.files);
              const file = files[0];
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = e => imageUrl = e.target.result;
            "
            />
            <button @click="submit">submit</button>

            <div style="display: inline-block;">
              <div x-show="error">
                <div
                  style="display: flex; align-items: center; justify-content: center; height: 100%; padding-left: 4px; padding-right: 4px; background-color: red; width: fit-content; color: white;"
                >
                  Error!
                </div>
              </div>
            </div>
          </div>
          <img
            x-if="imageUrl"
            :src="imageUrl"
            class="object-cover rounded border border-gray-200"
            style="width: auto; max-height: 300px;"
          />
        </div>
      `}
    </div>
  );
};
