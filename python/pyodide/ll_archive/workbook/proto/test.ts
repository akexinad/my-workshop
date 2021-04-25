import { Feature, GUID, Position } from './element_pb'
import { Point } from './geometry_pb'

const pos = new Position()
const pt = new Point()
pt.setX(0)
pt.setY(0)
pt.setZ(0)
pos.setGeometry(pt);
pos.setType(Position.Type.UNSPECIFIED)
const testFeat = new Feature();
testFeat.setName("Test Feature");
const guid = new GUID()
guid.setValue("c6082cb1-6697-4861-9e06-8df5f7d2a1fb")
testFeat.setId(guid)
testFeat.setPosition(pos)
testFeat.addTags("TestTag")
const m = testFeat.getAttributesMap();
m.set("Test", "b")