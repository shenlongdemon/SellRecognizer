import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Svg } from 'expo';

const {
    Circle,
    Rect,
    Line, G
} = Svg;


//"___-0123456789abcdefghijklmnopqrstuvwxyz"
export default class OMCode extends React.Component {
    //static STR = "___-0123456789abcdefghijklmnopqrstuvwxyz___";
    constructor(props) {
        super(props);
        console.log(JSON.stringify(StyleSheet.flatten(this.props.style)));

    }    
    render() {
        var style = StyleSheet.flatten(this.props.style);
        var size = style.width < style.height ? style.width : style.height;
        var r = size / 2;
        var M = size / 10;
        let STR = "_____________________________________________-0123456789abcdefghijklmnopqrstuvwxyz";
        return (

            <View style={styles.container}>
                <Text>{this.props.text}</Text>
                <Svg height={size} width={size}>
                    <Circle
                        cx={r}
                        cy={r}
                        r={r - 1}
                        stroke="blue"
                        strokeWidth="1"
                        fill="white"
                    />
                    {Array.from(this.props.text).map((c, key) => {
                        
                        let rotate = key * 360 / this.props.text.length;
                        let x_1 = r;
                        let y_1 = r + M;
                        let x_2 = r;
                        let y_2 = r + STR.indexOf(c) * r / STR.length;
                        return (
                            <G
                                rotation={rotate}
                                origin={(r, r)}
                                key={key}
                            >
                                <Line
                                    x1={x_1}
                                    y1={y_1}
                                    x2={x_2}
                                    y2={y_2}
                                    stroke="red"
                                    strokeWidth="2"
                                />
                                <Circle
                                    cx={x_2}
                                    cy={y_2}
                                    r={3}
                                    stroke="blue"
                                    strokeWidth="2"
                                    fill="white"
                                />
                            </G>
                        );

                    })}
                </Svg>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
/**
 * 
 *  calc2(pa,pb,AB1, AC, BAC){
        var AB = AC / Math.cos(BAC);
        return this.get_third_point_coordinates(AB, AC, BAC);
        // var BAC = BC / AB;
        // var x = (
        //     -1 * Math.tan(ABC) * pb.x + Math.tan(BAC) * pa.x + pb.y - pa.y
        // )
        // / (Math.tan(BAC) - Math.tan(ABC))
    }
    get_third_point_coordinates(a, b, angle){
        var c = b * Math.sin(angle);
        var result = {x:0,y:0};
      
        if(a > 0){
          result.x = (c*c - b*b + a*a) / (2*a);
        }
      
        result.y = Math.sqrt(c*c - result.x*result.x);
        return result;
      }

    calc(pA, pB, A1B, BC, angleABC) {
        
        //x3 = x1 + x*cos(a+30)
        //y3 = y1 + x*sin(a+30) 
        // var s = 1/Math.sqrt(3);
        // var x3 = pB.x + s*(pA.y - pB.y);
        // var y3 = pB.y + s*(pB.x - pA.x);

        var AB = AC / Math.cos(angleABC);


        var AC = BC * Math.sin(angleABC);
        var x = 2 * AC;
        var a = Math.atan((pB.y-pA.y)/(pB.x-pA.x));
        var x3 = pA.x + x*Math.cos(a+angleABC)
        var y3 = pA.y + x*Math.sin(a+angleABC)

        var AC = BC * Math.sin(angleABC);
        var Cy = (AB * AB + AC * AC - BC * BC) / (2 * AB);
        var Cx = Math.sqrt(AC * AC - Cy * Cy);
        return {
            x: x3,
            y: y3
        };
    }

    angleBetweenPoints(a, b) {
        var deltaY = b.y - a.y;
        var deltaX = b.x - a.x;
        return (Math.atan2(deltaY, deltaX));

    }
    pullPointReferenceToLineWithAngle(a, b, angle) {
        var angleBetween = this.angleBetweenPoints(b, a);
        var distance = Math.hypot(b.x - a.x, b.y - a.y);
        var x = (b.x + (distance * Math.cos((angleBetween + angle))));
        var y = (b.y + (distance * Math.sin((angleBetween + angle))));
        return { x: x, y: y };
    }
    pullPolygonPointsFromBasePoints(a,
        b, noOfSides) {
        var points = [];
        points.push(a);
        points.push(b);
        if (noOfSides < 3) {
            return points;
        }
        var angleBetweenTwoSides = ((((noOfSides - 2) * 180) / noOfSides) * Math.PI / 180);
        var i = 3;
        for (i; i <= noOfSides; i++) {
            var nextPoint = this.pullPointReferenceToLineWithAngle(
                points[i - 3], points[i - 2], angleBetweenTwoSides);
            points.push(nextPoint);
        }
        return points;
    }
    get_third_point_coordinates(a, b, c){
        var result = {x:0,y:0};
      
        if(a > 0){
          result.x = (c*c - b*b + a*a) / (2*a);
        }
      
        result.y = Math.sqrt(c*c - result.x*result.x);
        return result;
      }
 * 
 */