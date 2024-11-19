# Auth

## Installation

```bash
ng add @kalees64/vk-auth
```

## Usage

app.component.ts

```javascript
import { Component } from "@angular/core";
import { LoginComponent } from "@kalees64/vk-auth";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [LoginComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "angular-test1";
}
```

app.component.html

```javascript
<vk-login></vk-login>
```
