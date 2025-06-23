# Lernportal Betriebssysteme

Dieses Repository enthält eine statische Website zur Vorbereitung auf die Klausur im Fach Betriebssysteme. Jede HTML-Datei bildet eines der Vorlesungskapitel ab und kann über die Navigation aufgerufen werden.

## Inhaltsverzeichnis

- [Übersicht](index.html)
- [1. Einführung & Überblick](01_einfuehrung.html)
- [2. Grundlagen](02_grundlagen.html)
- [3. Prozesse](03_prozesse.html)
- [4. Threads](04_threads.html)
- [5. CPU-Scheduling](05_scheduling.html)
- [6. Synchronisation](06_synchronisation.html)
- [7. Kommunikation](07_kommunikation.html)
- [8. Deadlocks](08_deadlocks.html)
- [9. Speicherverwaltung](09_speicherverwaltung.html)
- [10. Dateisysteme](10_dateisysteme.html)
- [Übungen](uebungen.html)

## Projekt lokal starten

Die Seiten können direkt im Browser geöffnet werden. Für ein komfortableres Arbeiten empfiehlt sich ein kleiner lokaler Webserver, z.B. mit Python:

```bash
python3 -m http.server
```

Danach ist die Seite unter <http://localhost:8000> erreichbar.

Im Ordner `material` liegen zusätzliche PDFs und Beispielcode, die das Studium unterstützen. Unter `examples` findest du kleine, kommentierte C-Programme, die Themen wie Prozess- und Thread-Synchronisation illustrieren.
