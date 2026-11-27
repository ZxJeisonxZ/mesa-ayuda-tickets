# Mesa de Ayuda - Tickets de Soporte

Aplicación web para registrar y hacer seguimiento a tickets de soporte y mantenimiento de software.
Proyecto académico del módulo **Mantenimiento de Software** (Corporación Universitaria Iberoamericana).

## Cómo ejecutarla

No requiere instalación: abre `index.html` en el navegador (se necesita internet para cargar Tailwind CSS desde su CDN).

## Tecnologías

- HTML5
- JavaScript (sin frameworks)
- Tailwind CSS (CDN)

## Estructura

```
├── index.html
├── js/
│   └── app.js
├── docs/
│   └── historias-de-usuario.md
├── CHANGELOG.md
└── README.md
```

## Flujo de ramas

| Rama | Propósito |
|------|-----------|
| `main` | Producción: solo versiones estables y probadas |
| `qa` | Pruebas: versión candidata en validación |
| `develop` | Integración: reúne las historias terminadas |
| `feature/HU-XX-...` | Desarrollo de cada historia de usuario |

Flujo: `feature/*` → `develop` → `qa` → `main` (siempre mediante Pull Request).

## Historias de usuario

Ver [docs/historias-de-usuario.md](docs/historias-de-usuario.md).
