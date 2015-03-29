# TODO

## Basic Features
- update control points so that they're tangent after moving non-control points
- prevent control points intersecting straight edges
- allow two controls points to come off of a non-control point
- come up with a better data structure to describe the mix of control/non-control points
- add a way to add/remove points
- prevent control points from going past the intersection point
- add a way to toggle point/control point visibility
  - develop UI for starting new curves
  - splitting curves
  - adding new geometry points on a line or curve
- select a curve/line... pick an operation, e.g. delete, drag, split?
- select two points and click join:
  - with line? or make them the same point?

## Advanced Features
- select multiple points/control points and move them
- mirror mode
  - straight lines are perpendicular to mirror's edge
  - curves must have a point on mirror's edge with control points forming perpendiculars to the mirror's edge
- toggle continuity
- ability to replace bezier curves with circular arcs
- other transforms: rotation, scaling
