# Lernportal Betriebssysteme

Dieses Repository enthält eine statische Website zur Vorbereitung auf die Klausur im Fach Betriebssysteme. Jede HTML-Datei bildet eines der Vorlesungskapitel ab und kann über die Navigation aufgerufen werden.
Über das Suchfeld in der Navigation lassen sich Kapitel schnell auffinden.

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

## Navigation aus Templates erzeugen

Die Navigationsleiste wird aus einer Vorlage generiert. Die Links befinden sich in `scripts/nav_items.json`. Mit folgendem Befehl lässt sich `nav.html` neu erstellen:

```bash
python3 scripts/generate_nav.py
```


## Tests ausführen

Zur Qualitätssicherung liegen im Ordner `tests` zwei kleine Python-Skripte.
`check_lang.py` stellt sicher, dass alle HTML-Dateien ein `lang`-Attribut besitzen.
`check_alt.py` überprüft, ob sämtliche Bilder ein `alt`-Attribut haben.

Ausführen lassen sich die Tests mit:

```bash
python3 tests/check_lang.py
python3 tests/check_alt.py
```

Bei jedem Push werden diese Tests auch automatisch per GitHub Actions ausgeführt (siehe `.github/workflows/tests.yml`).
