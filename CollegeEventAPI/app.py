from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

events = [
    {
        "id": 1,
        "event_name": "Hack-o-Week",
        "club": "CSI",
        "venue": "Seminar Hall",
        "date": "2026-07-15",
        "status": "Upcoming"
    }
]

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/events", methods=["GET"])
def get_events():
    return jsonify(events)

@app.route("/events", methods=["POST"])
def add_event():
    event = request.get_json()
    events.append(event)
    return jsonify({"message":"Event Added Successfully!"})

@app.route("/events/<int:event_id>", methods=["PUT"])
def update_event(event_id):
    data = request.get_json()

    for event in events:
        if event["id"] == event_id:
            event.update(data)
            return jsonify({"message":"Event Updated Successfully!"})

    return jsonify({"message":"Event Not Found"}),404

@app.route("/events/<int:event_id>", methods=["DELETE"])
def delete_event(event_id):
    for event in events:
        if event["id"] == event_id:
            events.remove(event)
            return jsonify({"message":"Event Deleted Successfully!"})

    return jsonify({"message":"Event Not Found"}),404

if __name__=="__main__":
    app.run(debug=True)